import React from 'react';

interface LoaderProps {
    fileName: string;
    progress: number;
}

export const Loader: React.FC<LoaderProps> = ({ fileName, progress }) => {
    const roundedProgress = Math.round(progress);
    
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 w-full max-w-md bg-gray-800 rounded-xl shadow-lg border border-gray-700">
            <div className="relative flex items-center justify-center h-16 w-16 mb-6">
                <div className="absolute h-full w-full rounded-full bg-indigo-500 animate-ping opacity-75"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="relative h-10 w-10 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-200">Analyzing Project</h3>
            <p className="text-gray-400 mt-2 truncate w-full px-4" title={fileName}>{fileName}</p>
            
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-6">
                <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${roundedProgress}%`, transition: 'width 0.3s ease-in-out' }}></div>
            </div>
            <p className="text-sm text-indigo-400 mt-2 font-mono">{roundedProgress}%</p>
        </div>
    );
};