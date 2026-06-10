import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import { app } from 'electron';
import { DprProject, DprProjectFactory } from '../domain/DprProject';

export class SQLiteManager {
  private db: Database | null = null;
  private dbPath: string;

  constructor(customPath?: string) {
    // In production (Electron), we use app.getPath('userData').
    // In development or test, we use a local file or memory.
    const isElectron = process.type === 'browser' || process.versions.electron;
    
    if (customPath) {
      this.dbPath = customPath;
    } else if (isElectron) {
      this.dbPath = path.join(app.getPath('userData'), 'pmegp_dpr.sqlite');
    } else {
      this.dbPath = path.join(process.cwd(), 'local_dev.sqlite');
    }
  }

  public async init(): Promise<void> {
    this.db = await open({
      filename: this.dbPath,
      driver: sqlite3.Database,
    });

    await this.runMigrations();
  }

  private async runMigrations(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    // 1. Projects Table
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        status TEXT NOT NULL,
        schema_version TEXT NOT NULL,
        workbook_version TEXT NOT NULL,
        applicant_name TEXT,
        district TEXT,
        activity_type TEXT,
        project_cost REAL,
        data_payload TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Project Versions Table
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS project_versions (
        id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL,
        version_number INTEGER NOT NULL,
        data_payload TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects (id)
      )
    `);

    // 3. Audit Logs Table
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL,
        action TEXT NOT NULL,
        old_value TEXT,
        new_value TEXT,
        formula_registry_hash TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects (id)
      )
    `);

    // 4. Workbook Fingerprints Table
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS workbook_fingerprints (
        hash TEXT PRIMARY KEY,
        version_name TEXT NOT NULL,
        schema_mapping TEXT NOT NULL,
        is_supported INTEGER NOT NULL
      )
    `);

    // 5. Exports Table
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS exports (
        id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL,
        export_type TEXT NOT NULL,
        project_version_snapshot INTEGER NOT NULL,
        formula_hash TEXT NOT NULL,
        pdf_path TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects (id)
      )
    `);

    // 6. Settings Table
    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      )
    `);
  }

  public async saveProject(project: DprProject, status: 'DRAFT' | 'FINALIZED' | 'EXPORTED' = 'DRAFT'): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    // Extract summary fields
    const applicantName = project.layer1Data['applicant.name'] || '';
    const district = project.layer1Data['personal.B17'] || '';
    
    // In a full implementation, Activity Type and Project Cost need calculated fields mappings
    const activityType = '';
    const projectCost = 0;

    const payloadText = DprProjectFactory.serialize(project);
    const now = new Date().toISOString();

    await this.db.run(`
      INSERT INTO projects (
        id, status, schema_version, workbook_version, applicant_name, district, activity_type, project_cost, data_payload, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        status=excluded.status,
        schema_version=excluded.schema_version,
        workbook_version=excluded.workbook_version,
        applicant_name=excluded.applicant_name,
        district=excluded.district,
        activity_type=excluded.activity_type,
        project_cost=excluded.project_cost,
        data_payload=excluded.data_payload,
        updated_at=excluded.updated_at
    `, [
      project.metadata.id,
      status,
      project.metadata.schemaVersion,
      project.metadata.workbookVersion,
      applicantName,
      district,
      activityType,
      projectCost,
      payloadText,
      project.metadata.createdAt,
      now
    ]);

    // Insert into project_versions for history
    const row = await this.db.get('SELECT COUNT(*) as count FROM project_versions WHERE project_id = ?', [project.metadata.id]);
    const versionNumber = (row.count || 0) + 1;
    
    const { v4: uuidv4 } = require('uuid');
    await this.db.run(`
      INSERT INTO project_versions (id, project_id, version_number, data_payload)
      VALUES (?, ?, ?, ?)
    `, [uuidv4(), project.metadata.id, versionNumber, payloadText]);
    
    // Insert into audit logs
    await this.db.run(`
      INSERT INTO audit_logs (id, project_id, action, formula_registry_hash)
      VALUES (?, ?, ?, ?)
    `, [uuidv4(), project.metadata.id, 'SAVE_PROJECT', project.metadata.formulaRegistryHash]);
  }

  public async getProject(id: string): Promise<DprProject | null> {
    if (!this.db) throw new Error('Database not initialized');

    const row = await this.db.get('SELECT data_payload FROM projects WHERE id = ?', [id]);
    if (!row) return null;

    return DprProjectFactory.deserialize(row.data_payload);
  }

  public async listProjects(): Promise<any[]> {
    if (!this.db) throw new Error('Database not initialized');

    return this.db.all('SELECT id, status, applicant_name, district, activity_type, project_cost, updated_at FROM projects ORDER BY updated_at DESC');
  }
}
