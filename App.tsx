import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FileUpload } from './components/FileUpload';
import { AnalysisView } from './components/AnalysisView';
import { Loader } from './components/Loader';
import { analyzeProjectStructure } from './services/geminiService';
import type { FileNode } from './types';
import { AppState } from './types';

const FeatureCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 transition-all hover:border-indigo-500/50 hover:bg-gray-800 h-full">
        <h3 className="text-lg font-semibold text-indigo-400 mb-3">{title}</h3>
        <p className="text-gray-400 text-sm">{children}</p>
    </div>
);

const HowItWorksStep: React.FC<{ number: string, title: string, children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500/20 border border-indigo-500 text-indigo-300 font-bold mr-4">
            {number}
        </div>
        <div>
            <h4 className="font-semibold text-gray-200">{title}</h4>
            <p className="text-sm text-gray-400 mt-1">{children}</p>
        </div>
    </div>
);

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [file, setFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<FileNode[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<number | null>(null);

  const clearProgressInterval = () => {
    if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
    }
  };

  const handleFileAnalysis = useCallback(async (selectedFile: File) => {
    setFile(selectedFile);
    setAppState(AppState.ANALYZING);
    setErrorMessage(null);
    setAnalysisResult(null);
    setProgress(0);

    // Simulate analysis progress
    progressIntervalRef.current = window.setInterval(() => {
        setProgress(prev => {
            if (prev >= 95) {
                clearProgressInterval();
                return 95;
            }
            return prev + Math.floor(Math.random() * 5) + 1;
        });
    }, 200);

    try {
      const result = await analyzeProjectStructure(selectedFile.name);
      clearProgressInterval();
      setProgress(100);
      setAnalysisResult(result);
      setAppState(AppState.RESULTS);
    } catch (error) {
      clearProgressInterval();
      setProgress(0);
      console.error("Analysis failed:", error);
      const message = error instanceof Error ? error.message : "An unknown error occurred during analysis.";
      setErrorMessage(message);
      setAppState(AppState.ERROR);
    }
  }, []);

  useEffect(() => {
    // Cleanup interval on unmount
    return () => clearProgressInterval();
  }, []);


  const handleReset = () => {
    setFile(null);
    setAnalysisResult(null);
    setErrorMessage(null);
    setProgress(0);
    setAppState(AppState.IDLE);
  };

  const renderContent = () => {
    switch (appState) {
      case AppState.ANALYZING:
        return <Loader fileName={file?.name || 'project'} progress={progress} />;
      case AppState.RESULTS:
        return (
          analysisResult && file && (
            <AnalysisView
              fileName={file.name}
              nodes={analysisResult}
              onReset={handleReset}
            />
          )
        );
      case AppState.ERROR:
        return (
          <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-red-400 mb-4">Analysis Failed</h3>
            <p className="text-gray-300 mb-6">{errorMessage}</p>
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors"
            >
              Try Again
            </button>
          </div>
        );
      case AppState.IDLE:
      default:
        return (
            <div className="w-full flex flex-col items-center animate-fade-in">
                <FileUpload onFileUpload={handleFileAnalysis} />
                
                <section className="mt-12 md:mt-16 max-w-5xl w-full text-left px-4 md:px-0">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                        <div className="space-y-6">
                             <h2 className="text-2xl md:text-3xl font-bold text-gray-200">How It Works</h2>
                             <HowItWorksStep number="1" title="Input">
                                User uploads a ZIP project facing issues (extra files, unused code, build errors).
                             </HowItWorksStep>
                             <HowItWorksStep number="2" title="Analysis">
                                The model scans the full project, detecting unused files, duplicates, and build artifacts.
                             </HowItWorksStep>
                             <HowItWorksStep number="3" title="Auto-Update">
                                Removes junk, keeps essentials, and optionally fixes dependencies in package.json.
                             </HowItWorksStep>
                             <HowItWorksStep number="4" title="Output">
                                Returns a cleaned, updated ZIP that is production-ready and lightweight.
                             </HowItWorksStep>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-200">Core Abilities</h2>
                            <FeatureCard title="Deep Project Analysis">
                                Scans your entire codebase, identifying redundant files, unused components, and bloated build artifacts.
                            </FeatureCard>
                             <FeatureCard title="Intelligent Usage Tracking">
                                Parses your code to understand which files and assets are actually used, ensuring nothing essential is ever removed.
                            </FeatureCard>
                            <FeatureCard title="Dependency Cleanup">
                                Scans your package.json to flag unused or mismatched dependencies, helping you trim your project's footprint.
                            </FeatureCard>
                            <FeatureCard title="Automated Refactoring">
                                Generates a production-ready, lightweight version of your project, delivered as a clean ZIP file.
                            </FeatureCard>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <header className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                AI Project Cleaner
            </h1>
            <p className="text-gray-400 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
                A trained AI model that automatically cleans and optimizes user-uploaded project ZIP files.
            </p>
        </header>
        <main className="w-full max-w-5xl min-h-[400px] flex items-center justify-center px-2">
            {renderContent()}
        </main>
        <footer className="text-center mt-8 text-gray-500 text-sm">
            <p>Powered by Gemini API</p>
        </footer>
    </div>
  );
};

export default App;