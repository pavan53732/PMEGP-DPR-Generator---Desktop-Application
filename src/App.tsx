import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans text-slate-800">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg text-center border border-slate-100">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
          PMEGP DPR Pro
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          The ultimate detailed project report generator powered by a 100% parity compatibility engine.
        </p>
        <div className="space-x-4">
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-sm">
            Create New Project
          </button>
          <button className="px-6 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg font-medium transition-colors shadow-sm">
            Import Workbook
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
