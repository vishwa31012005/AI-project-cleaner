
export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  status: 'keep' | 'delete';
  reason: string;
  children?: FileNode[];
}

export enum AppState {
    IDLE = 'idle',
    ANALYZING = 'analyzing',
    RESULTS = 'results',
    ERROR = 'error',
}
