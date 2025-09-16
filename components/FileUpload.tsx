import React, { useState, useCallback } from 'react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-16 md:w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 15l-3-3m0 0l3-3m-3 3h12" />
    </svg>
);


export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/zip' || file.name.endsWith('.zip')) {
        onFileUpload(file);
      } else {
        alert('Please upload a .zip file.');
      }
    }
  }, [onFileUpload]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };


  return (
    <div className="w-full max-w-2xl text-center">
      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`p-6 md:p-10 border-2 border-dashed rounded-xl transition-all duration-300 ${isDragging ? 'border-indigo-400 bg-gray-800 scale-105' : 'border-gray-600 bg-gray-800/50'}`}
      >
        <input 
            type="file" 
            id="file-upload" 
            className="hidden" 
            accept=".zip"
            onChange={handleChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
          <UploadIcon />
          <p className="text-base sm:text-lg font-semibold text-gray-300">
            <span className="text-indigo-400">Click to upload</span> or drag and drop
          </p>
          <p className="text-sm text-gray-500 mt-1">
            ZIP file only (Max 100MB)
          </p>
        </label>
      </div>
    </div>
  );
};