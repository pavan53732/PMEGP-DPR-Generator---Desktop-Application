# SQLite Schema Specification

The `pmegp_dpr_pro.sqlite` database acts as the single source of truth for the local application state, storing projects, templates, and audit logs.

## 1. Table: `projects`
Stores the active DPR projects.
- `id` (UUID, Primary Key)
- `name` (String, e.g., "M/S Bakery Industries")
- `status` (Enum: DRAFT, FINALIZED, EXPORTED)
- `schema_version` (String)
- `workbook_version` (String)
- `data_payload` (JSONB) — The core schema data map.
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## 2. Table: `project_versions`
Historical snapshots of a project for undo/restore functionality.
- `id` (UUID, Primary Key)
- `project_id` (UUID, Foreign Key)
- `version_number` (Int)
- `data_payload` (JSONB)
- `created_at` (Timestamp)

## 3. Table: `audit_logs`
Immutable ledger of crucial financial application changes.
- `id` (UUID, Primary Key)
- `project_id` (UUID, Foreign Key)
- `action` (String)
- `old_value` (JSON)
- `new_value` (JSON)
- `timestamp` (Timestamp)

## 4. Table: `workbook_fingerprints`
Tracks known PMEGP macro workbook versions and their compatibility.
- `hash` (String, Primary Key)
- `version_name` (String)
- `schema_mapping` (JSON)
- `is_supported` (Boolean)

## 5. Table: `exports`
Tracks generated PDFs and their precise inputs for legal/banking auditability.
- `id` (UUID, Primary Key)
- `project_id` (UUID, Foreign Key)
- `file_path` (String)
- `export_type` (Enum: PMEGP_APPLICATION, PROJECT_AT_A_GLANCE, FULL_DPR)
- `project_version_snapshot` (Int)
- `generated_at` (Timestamp)

## 6. Table: `settings`
Global app configurations.
- `key` (String, Primary Key)
- `value` (JSON)
