# 🐙 OctoFit Tracker

A modern multi-tier fitness tracking application built with GitHub Copilot Agent Mode.

## Architecture

### Frontend (React 19 + Vite)
- **Port:** 5173
- **Framework:** React 19
- **Build Tool:** Vite
- **Location:** `octofit-tracker/frontend/`

### Backend (Node.js + Express + TypeScript)
- **Port:** 8000
- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Location:** `octofit-tracker/backend/`

### Database
- **Port:** 27017
- **Type:** MongoDB
- **URI:** `mongodb://localhost:27017/octofit-tracker`

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or via Docker)

### Frontend Setup
```bash
cd octofit-tracker/frontend
npm install
npm run dev
```
Access at: http://localhost:5173

### Backend Setup
```bash
cd octofit-tracker/backend
npm install
npm run dev
```
Server runs at: http://localhost:8000

### MongoDB Setup
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or use local MongoDB installation
mongod
```

## API Endpoints
- `GET /health` - Health check endpoint

## Development
- Frontend hot reload: Enabled via Vite
- Backend auto-restart: Enabled via tsx watch
- MongoDB: Automatically connects on backend startup
