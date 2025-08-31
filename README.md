Tone Picker Text Tool
A React-based web application that allows users to adjust the tone of their text using AI-powered conversions. Users can transform text between different tones (formal, casual, friendly, professional) through an intuitive 3×3 matrix interface.

https://img.shields.io/badge/Status-Deployed-success https://img.shields.io/badge/Frontend-React-blue https://img.shields.io/badge/Backend-Node.js-green https://img.shields.io/badge/AI-MistralAI-purple

🌟 Live Deployment
Application URL: https://tone-picker-tool.vercel.app

Backend API: https://tone-picker-backend.onrender.com

📹 Video Demonstration
Watch the application walkthrough: https://www.loom.com/share/your-video-id-here

Note: The video demonstrates all core functionality including text editing, tone conversion, undo/redo features, and error handling.

✨ Features
Text Editor: Clean interface for text input and editing

Tone Picker Matrix: 3×3 grid for converting between different tones

Undo/Redo Functionality: Complete history tracking and navigation

Responsive Design: Works seamlessly on desktop and mobile devices

Real-time AI Processing: Mistral AI-powered tone conversion

Comprehensive Error Handling: User-friendly error messages and recovery

Intelligent Caching: Reduces API calls and improves performance

Loading States: Visual feedback during processing

🛠️ Technology Stack
Frontend
React with Vite build tool

Custom Hooks for state management

Axios for API communication

Modern CSS with Flexbox and Grid

Responsive Design principles

Backend
Node.js with Express.js

Mistral AI API integration

Caching with node-cache

CORS enabled for cross-origin requests

Environment-based configuration

🚀 Quick Start
Prerequisites
Node.js (v16 or higher)

npm or yarn package manager

Mistral AI API account (sign up here)

Installation
Clone the repository

bash
git clone https://github.com/your-username/tone-picker-tool.git
cd tone-picker-tool
Backend Setup

bash
cd backend
npm install

# Create environment file

cp .env.example .env

# Edit .env with your Mistral API key

# Start development server

npm run dev
Frontend Setup

bash
cd ../frontend
npm install

# Start development server

npm run dev
Access the application

Frontend: http://localhost:3000

Backend API: http://localhost:5000

Deployment
Backend Deployment (Render)
Connect your GitHub repository to Render

Set environment variables in Render dashboard

Deploy from main branch

Frontend Deployment (Vercel)
Connect your GitHub repository to Vercel

Set environment variable: VITE_API_URL=https://your-backend-url.onrender.com

Deploy from main branch

🏗️ Technical Architecture
Frontend Decisions
I chose React with Vite for:

Fast development experience with hot module replacement

Excellent React support and ecosystem

Smaller bundle size compared to Create React App

Modern tooling with minimal configuration

State Management
Implemented a custom hook (useTextHistory) because:

State management needs were relatively simple

Kept the component tree clean without prop drilling

Provided a focused solution for text history management

Made undo/redo functionality self-contained and reusable

Backend Architecture
The backend uses Express.js with:

ES Modules for modern JavaScript support

Middleware-based architecture for separation of concerns

Environment-based configuration for security

Caching layer to reduce API calls

Trade-offs Made
Caching: Used in-memory caching instead of Redis for simplicity

Error Handling: Implemented comprehensive but simple error handling

State Persistence: Chose session-based persistence rather than database storage

UI Framework: Used pure CSS instead of a UI framework to keep bundle size small

🔄 State Management: Undo/Redo Functionality
Implementation Details
The undo/redo functionality uses a custom React hook useTextHistory that manages:

javascript
const [history, setHistory] = useState([initialText]); // Array of text states
const [currentIndex, setCurrentIndex] = useState(0); // Pointer to current state
How It Works
Initialization: Starts with initial text state and index 0

Adding to History: When text changes:

javascript
const addToHistory = (newText) => {
const newHistory = history.slice(0, currentIndex + 1);
newHistory.push(newText);
setHistory(newHistory);
setCurrentIndex(newHistory.length - 1);
};
Undo Operation: Moves back through history states

Redo Operation: Moves forward through history states

Benefits
Linear Time Complexity: All operations are efficient

Memory Efficiency: Only stores text changes

Predictable Behavior: Matches user expectations

Self-Contained: Reusable across components

🛡️ Error Handling & Edge Cases
Comprehensive Error Strategy
API Error Handling:

Network timeouts

API rate limiting (429 errors)

Authentication failures (401 errors)

Server errors (5xx responses)

User Input Validation:

Empty text validation

Invalid tone selection handling

Maximum text length considerations

UI Feedback System:

Loading states during API requests

Error messages with user-friendly explanations

Success feedback for completed operations

Specific Edge Cases Handled
Empty Text Submission:

javascript
if (!currentText.trim()) {
setError('Please enter some text first');
return;
}
Network Connectivity Issues:

javascript
if (error.code === 'NETWORK_ERROR') {
setError('Network error. Please check your connection.');
}
API Rate Limiting:

javascript
if (error.response?.status === 429) {
setError('Rate limit exceeded. Please try again in a moment.');
}
Concurrent Requests Prevention: Disable UI during processing

Browser Compatibility: CSS feature detection with fallbacks

Cache Management: Time-based expiration and invalidation

Error Recovery
Retry Mechanism: Users can retry failed operations

State Preservation: Text content is preserved during errors

Graceful Degradation: Application remains usable when API is unavailable

Mock Mode: Falls back to simulated responses when API key is invalid
