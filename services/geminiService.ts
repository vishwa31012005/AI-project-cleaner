
import { GoogleGenAI, Type } from "@google/genai";
import type { FileNode } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING, description: "The name of the file or folder." },
      type: { type: Type.STRING, enum: ['file', 'folder'], description: "The type of the entry." },
      status: { type: Type.STRING, enum: ['keep', 'delete'], description: "Decision to keep or delete the item." },
      reason: { type: Type.STRING, description: "A brief justification for the decision." },
      children: {
        type: Type.ARRAY,
        description: "An array of nested files and folders. Omit for files or empty folders.",
        items: {
            // Recursive self-reference for schema is complex, so we rely on the model's intelligence
            // to follow the pattern based on the prompt. This simplified schema helps guide it.
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                type: { type: Type.STRING, enum: ['file', 'folder'] },
                status: { type: Type.STRING, enum: ['keep', 'delete'] },
                reason: { type: Type.STRING },
            }
        }
      }
    },
    required: ['name', 'type', 'status', 'reason']
  }
};


export async function analyzeProjectStructure(fileName: string): Promise<FileNode[]> {
    const prompt = `
        You are a professional software architect and code project cleaner with 20+ years of experience.
        I will provide the filename of a project ZIP file. Based on this name, like '${fileName}', you must generate a plausible but fictional file structure for that type of project (e.g., React, Next.js, Vite, Node.js).

        Your task is to analyze this generated structure and identify which files to keep and which to remove for a clean, production-ready build.
        Identify and mark for deletion:
        - Duplicate files
        - Unused components
        - Auto-generated test/demo/example files that aren't core to the app logic
        - Temporary build folders (e.g., 'dist', 'build')
        - AI-generated drafts or notes not linked anywhere in the main app
        - Unnecessary configuration files from boilerplate templates

        Keep only:
        - Essential source code files required for the app to run.
        - Core configuration files (package.json, vite.config.js, etc.).
        - Assets that are actually used.

        For each file and folder, you must decide whether to 'keep' or 'delete' it and provide a brief, one-sentence reason for your decision.

        Your output MUST be a valid JSON array of objects, representing the root of the project. The structure must be recursive for folders containing other items. Each object must have the following structure:
        {
          "name": "string",
          "type": "'file' | 'folder'",
          "status": "'keep' | 'delete'",
          "reason": "string",
          "children": "[...]" // Omit for files or empty folders
        }
        Do not include any other text, markdown formatting, or explanations outside of the JSON output. The entire response must be only the JSON array.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });
        
        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);

        if (!Array.isArray(result)) {
            throw new Error("API did not return a valid JSON array.");
        }

        return result as FileNode[];

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get a valid analysis from the AI. The model may have returned an unexpected format.");
    }
}
