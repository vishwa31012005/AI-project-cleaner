import React, { useState } from 'react';
import type { FileNode } from '../types';
import { FileTree } from './FileTree';

interface AnalysisViewProps {
  fileName: string;
  nodes: FileNode[];
  onReset: () => void;
}

const ZipIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16" />
    </svg>
);

const generateReport = (nodes: FileNode[], indent = ''): string => {
    let report = '';
    nodes.forEach(node => {
        report += `${indent}- [${node.status.toUpperCase()}] ${node.name} (${node.reason})\n`;
        if (node.children) {
            report += generateReport(node.children, indent + '  ');
        }
    });
    return report;
};


export const AnalysisView: React.FC<AnalysisViewProps> = ({ fileName, nodes, onReset }) => {
  const [isCleaning, setIsCleaning] = useState(false);
  const [isCleaned, setIsCleaned] = useState(false);

  const handleClean = () => {
    setIsCleaning(true);

    // Generate the report content
    const reportContent = `AI Project Cleaner Analysis Report for: ${fileName}\n\n` +
                          '========================================\n\n' +
                          generateReport(nodes) +
                          '\n========================================\n';
    
    // Create a Blob and trigger download
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analysis_report_${fileName.replace('.zip', '')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Short delay to show feedback before setting as "cleaned"
    setTimeout(() => {
        setIsCleaning(false);
        setIsCleaned(true);
        // Optional: Reset after a few seconds
        setTimeout(() => {
             // onReset(); // You can enable this to auto-reset
        }, 3000);
    }, 500);
  };

  const getStats = (nodeList: FileNode[]): { keep: number; delete: number } => {
    let stats = { keep: 0, delete: 0 };
    const traverse = (node: FileNode) => {
      if (node.status === 'keep') stats.keep++;
      if (node.status === 'delete') stats.delete++;
      if (node.children) {
        node.children.forEach(traverse);
      }
    };
    nodeList.forEach(traverse);
    return stats;
  };

  const stats = getStats(nodes);

  return (
    <div className="w-full bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden flex flex-col animate-fade-in">
      <header className="p-4 border-b border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 bg-gray-800/80 backdrop-blur-sm">
        <div className="flex items-center w-full md:w-auto">
            <ZipIcon />
            <h2 className="text-base md:text-lg font-semibold text-gray-200 truncate" title={fileName}>
                Analysis for: <span className="text-indigo-400">{fileName}</span>
            </h2>
        </div>
        <div className="flex items-center space-x-4 self-end md:self-center">
            <span className="text-sm font-medium text-green-400">Keep: {stats.keep}</span>
            <span className="text-sm font-medium text-red-400">Delete: {stats.delete}</span>
        </div>
      </header>
      
      <div className="p-2 sm:p-4 md:p-6 overflow-y-auto max-h-[60vh] md:max-h-[50vh] min-h-[300px]">
        <FileTree nodes={nodes} />
      </div>

      <footer className="p-4 border-t border-gray-700 bg-gray-900/50 flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 sm:gap-4">
        <button
            onClick={onReset}
            disabled={isCleaning}
            className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
            Start Over
        </button>
        <button
            onClick={handleClean}
            disabled={isCleaning || isCleaned}
            className="w-full sm:w-auto px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
            {isCleaning && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {isCleaning ? "Downloading..." : isCleaned ? "Report Downloaded!" : "Clean & Download Report"}
        </button>
      </footer>
    </div>
  );
};