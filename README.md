# Tasks board

This project is a simple web application for task planning and management, built using modern technologies to create an interactive interface. The core functionality includes the ability to drag and drop tasks between days and users, interact with a context menu, edit tasks, and store data locally.

## Technologies

- **React**: Functional components and hooks for building the user interface.
- **TypeScript**: Strict typing for better code safety and maintainability.
- **TailwindCSS**: A utility-first CSS framework for fast styling without writing complex CSS rules.
- **Next.js**: A framework for building server-rendered applications and SPAs (Single Page Applications) with support for routing and optimizations.
- **HTML5 drag-and-drop API**: Implementation of task dragging functionality for task scheduling.
- **Local Storage**: Storing data on the client side to persist the application state.
- **Zustand**: A simple state management library for managing the global state of the application.
- **App Router (Next.js)**: Routing for the application using Next.js App Router for easy navigation management.

## Project Description

This application allows users to plan tasks, drag them between days or users, and edit tasks via a context menu. All changes are stored in Local Storage, ensuring the state persists even after a page reload. The project is built using **Next.js** for structuring the application with the advantages of server-side rendering and fast routing.

### Core Features:
- **Task Dragging**: Tasks can be dragged between days and users using the HTML5 drag-and-drop API.
- **Context Menu**: Right-clicking on items opens a context menu to edit or delete tasks.
- **Modal Windows**: Modal dialogs are used for editing tasks, enhancing the user interaction.
- **Dynamic Data Updates**: Tasks are stored in Local Storage and dynamically updated when changes occur within the app.

## How to Run the Project

To run the project locally, follow these steps:

### Step 1: Clone the Repository

Clone the repository to your local machine using Git:

git clone https://github.com/StsKushnir/tasks-board-test.git

### Step 2: Install Dependencies
Navigate to the project folder and install all dependencies using npm:

cd task-planner
npm install

Step 3: Run the Development Server
Start the development server:

npm run dev 

This will start the server at http://localhost:3000. Open this URL in your browser to see the project in action.


