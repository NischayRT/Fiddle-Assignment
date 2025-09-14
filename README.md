# 🎨 Tone Picker Text Tool

A **React-based web application** that allows users to adjust the tone of their text using **AI-powered conversions**. Users can transform text between different tones (formal, casual, friendly, professional) through an intuitive **3×3 matrix interface**.

![Status](https://img.shields.io/badge/Status-Deployed-success) ![Frontend](https://img.shields.io/badge/Frontend-React-blue) ![Backend](https://img.shields.io/badge/Backend-Node.js-green) ![AI](https://img.shields.io/badge/AI-MistralAI-purple)

---

## 🌟 Live Deployment
- **Application URL**: [Tone Picker Tool](https://text-tone-picker.netlify.app/)
- **Backend API**: [Backend Service](https://tone-picker-backend.onrender.com)


> The demo covers text editing, tone conversion, undo/redo features, and error handling.

---

## ✨ Features
- 📝 **Text Editor** – Clean and intuitive interface for editing text
- 🎛 **Tone Picker Matrix** – 3×3 grid for converting between tones
- ⏪ **Undo/Redo Functionality** – Complete history tracking
- 📱 **Responsive Design** – Works across devices
- ⚡ **Real-time AI Processing** – Powered by Mistral AI
- 🚨 **Comprehensive Error Handling** – Friendly messages & recovery
- 🧠 **Intelligent Caching** – Reduces API calls, boosts performance
- ⏳ **Loading States** – Visual feedback during processing

---

## 🛠️ Technology Stack

### Frontend
- React + Vite
- Custom React Hooks for state management
- Axios for API communication
- Modern CSS (Flexbox + Grid)
- Responsive UI principles

### Backend
- Node.js + Express.js
- Mistral AI API integration
- Caching with `node-cache`
- CORS enabled
- Environment-based configuration

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Mistral AI API account

### Installation

```bash
# Clone repo
git clone https://github.com/your-username/tone-picker-tool.git
cd tone-picker-tool
```

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env   # Add your Mistral API key
npm run dev            # Start backend server
```

#### Frontend Setup
```bash
cd ../frontend
npm install
npm run dev            # Start frontend server
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)


## 🏗️ Technical Architecture

### Frontend Decisions
- Chose **React + Vite** for speed, hot reload, and smaller bundle size
- Custom hook (`useTextHistory`) for simple and reusable state management

### Backend Architecture
- Express.js with middleware-based separation
- In-memory caching (instead of Redis for simplicity)
- Environment-based configuration for security

### Trade-offs Made
- In-memory cache instead of Redis
- Session-based state persistence (no DB)
- Pure CSS (keeps bundle light, avoids heavy UI frameworks)

---

## 🔄 Undo/Redo Functionality

Implemented via a **custom React hook** `useTextHistory`:

```javascript
const [history, setHistory] = useState([initialText]);
const [currentIndex, setCurrentIndex] = useState(0);

const addToHistory = (newText) => {
  const newHistory = history.slice(0, currentIndex + 1);
  newHistory.push(newText);
  setHistory(newHistory);
  setCurrentIndex(newHistory.length - 1);
};
```
- Efficient (linear complexity)
- Memory-friendly (stores only text states)
- Predictable user experience
- Reusable across components

---

## 🛡️ Error Handling & Edge Cases

### API Error Handling
- Network issues, rate limiting (429), auth failures (401), server errors (5xx)

### User Input Validation
- Prevents empty submissions
- Handles invalid tone selections
- Enforces max text length

### UI Feedback
- Loading indicators
- User-friendly error messages
- Success notifications

### Edge Cases Covered
- Empty text submission
- Network connectivity issues
- API rate limiting
- Concurrent requests prevention
- Cross-browser compatibility
- Cache invalidation with expiry

### Recovery
- Retry failed operations
- Preserve user text during errors
- Mock mode fallback when API unavailable

