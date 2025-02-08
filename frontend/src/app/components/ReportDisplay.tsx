'use client';

import React from 'react';
import { Report } from '../types/Report';

interface ReportDisplayProps {
  report: Report[];
}

export const ReportDisplay: React.FC<ReportDisplayProps> = ({ report }) => {
  if (!report || report.length === 0) {
    return <p className="text-red-500">No report available.</p>;
  }

  const reportData = report[0];

  return (
    <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
      {/* Basic Details */}
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Credit Report</h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          {[
            { label: 'Name', value: reportData.basicDetails?.name },
            { label: 'Mobile Phone', value: reportData.basicDetails?.mobilePhone },
            { label: 'PAN', value: reportData.basicDetails?.pan },
            { label: 'Credit Score', value: reportData.basicDetails?.creditScore }
          ].map(({ label, value }, index) => (
            <div key={index} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">{label}</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value ?? 'N/A'}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Report Summary */}
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Report Summary</h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          {Object.entries(reportData.reportSummary || {}).map(([key, value], index) => (
            <div key={index} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{typeof value === 'number' ? `₹${value}` : value ?? 'N/A'}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Credit Accounts Information */}
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Credit Accounts Information</h3>
      </div>
      <div className="border-t border-gray-200">
        {reportData.creditAccountsInformation?.length > 0 ? (
          reportData.creditAccountsInformation.map((account, index) => (
            <div key={index} className="px-4 py-5 sm:p-6">
              <h4 className="text-md font-medium text-gray-900">Account {index + 1}</h4>
              <dl className="mt-2 sm:divide-y sm:divide-gray-200">
                {Object.entries(account).map(([key, value], subIndex) => (
                  <div key={subIndex} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{typeof value === 'number' ? `₹${value}` : value ?? 'N/A'}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))
        ) : (
          <p className="px-4 py-5 text-sm text-gray-500">No credit accounts found.</p>
        )}
      </div>
    </div>
  );
};
