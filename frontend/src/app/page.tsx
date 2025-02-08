'use client'
import React from 'react';
import { FileUpload } from './components/FileUpload';
import { ReportDisplay } from './components/ReportDisplay';
import { useReport } from './hooks/useReport';

const App: React.FC = () => {
  const { report, loading, error, processReport } = useReport();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Credit Report Processor</h1>
      <FileUpload onFileUpload={processReport} />
      {loading && <p className="mt-4">Processing report...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {report?.length ? <ReportDisplay report={report} /> : ''}

    </div>
  );
};

export default App;