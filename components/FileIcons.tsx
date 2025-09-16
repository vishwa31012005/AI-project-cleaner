
import React from 'react';

const FolderIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
  </svg>
);

const FileIconGeneric: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
  </svg>
);

const ReactIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"></path><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M6.34 17.66l-1.41 1.41"></path><path d="M19.07 4.93l-1.41 1.41"></path>
  </svg>
);

const JsonIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm0 2h6v12H7V4zm2 2a1 1 0 011 1v1h2V7a1 1 0 112 0v1h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H8v1a1 1 0 11-2 0v-1H5a1 1 0 110-2h1V8H5a1 1 0 010-2h1V5a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const GitIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 18v-6m0 6v-6m0 6h-6m6 0h-6m6 0h6"/><path d="M12 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M6 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M18 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M6 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M12 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M6 18a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M18 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/><path d="M6 6v12 M12 6v6 M18 6v6"/>
    </svg>
);


interface FileIconProps {
  fileName: string;
  isFolder: boolean;
}

export const FileIcon: React.FC<FileIconProps> = ({ fileName, isFolder }) => {
  if (isFolder) return <FolderIcon />;
  
  if (/\.(jsx|tsx)$/.test(fileName)) return <ReactIcon />;
  if (/\.json$/.test(fileName)) return <JsonIcon />;
  if (/\.git.*$/.test(fileName)) return <GitIcon />;
  
  return <FileIconGeneric />;
};
