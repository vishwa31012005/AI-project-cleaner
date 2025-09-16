# 🤖 AI Project Cleaner

✨ An intelligent web application that analyzes and optimizes your project's structure using the power of the Google Gemini API. ✨

This tool acts as a virtual software architect, helping developers clean up their codebases by identifying and removing unnecessary files. Simply upload your project as a `.zip` file to receive a detailed, interactive report on which files are essential and which are redundant.

---

## 🚀 Core Abilities

-   **Deep Project Analysis:** Scans your entire codebase, identifying redundant files, unused components, and bloated build artifacts.
-   **Intelligent Usage Tracking:** Parses your code to understand which files and assets are actually used, ensuring nothing essential is ever removed.
-   **Dependency Cleanup:** Scans your `package.json` to flag unused or mismatched dependencies, helping you trim your project's footprint.
-   **Automated Refactoring:** Generates a production-ready, lightweight version of your project, delivered as a clean ZIP file.

## 🛠️ How It Works

1.  **Input:** Upload a `.zip` project that has extra files, unused code, or build artifacts.
2.  **Analysis:** The AI model scans the full project structure, detecting unused files, duplicate components, and temporary build folders.
3.  **Auto-Update:** The analysis generates a report that marks junk files for removal, keeps essential source code, and highlights potential dependency issues.
4.  **Output:** Download a detailed text report summarizing the AI's recommendations, helping you create a production-ready, lightweight project.

## 💻 Tech Stack

-   **Frontend:** React, TypeScript
-   **Styling:** Tailwind CSS
-   **AI/Backend:** Google Gemini API
-   **Bundler:** Vite (inferred, standard for this setup)

---

This project was built to showcase the capabilities of modern AI in developer tooling and code analysis.
