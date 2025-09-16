import React, { useState } from 'react';
import type { FileNode } from '../types';
import { FileIcon } from './FileIcons';

interface FileTreeProps {
  nodes: FileNode[];
  level?: number;
}

const TreeItem: React.FC<{ node: FileNode; level: number }> = ({ node, level }) => {
  const [isOpen, setIsOpen] = useState(node.type === 'folder');
  const hasChildren = node.children && node.children.length > 0;

  const statusColor = node.status === 'keep' ? 'text-gray-300' : 'text-red-400 line-through';
  const reasonColor = node.status === 'keep' ? 'text-green-400' : 'text-red-400';

  return (
    <div>
      <div className="flex items-center justify-between p-1.5 rounded-md hover:bg-gray-700/50 group">
        <div style={{ paddingLeft: `${level * 16}px` }} className="flex items-center flex-grow truncate mr-2">
          {node.type === 'folder' && hasChildren && (
             <button onClick={() => setIsOpen(!isOpen)} className="mr-2 text-gray-500 hover:text-gray-300 focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
          )}
           <div className={`mr-2 ${node.type === 'folder' && !hasChildren ? 'ml-6' : ''}`}>
             <FileIcon fileName={node.name} isFolder={node.type === 'folder'} />
           </div>
          <span className={`truncate ${statusColor}`}>{node.name}</span>
        </div>
        <span className={`flex-shrink-0 ml-4 text-xs italic opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${reasonColor} truncate`}>
            {node.reason}
        </span>
      </div>
      {isOpen && hasChildren && (
        <FileTree nodes={node.children!} level={level + 1} />
      )}
    </div>
  );
};


export const FileTree: React.FC<FileTreeProps> = ({ nodes, level = 0 }) => {
  return (
    <div>
      {nodes.map((node, index) => (
        <TreeItem key={`${node.name}-${index}`} node={node} level={level} />
      ))}
    </div>
  );
};