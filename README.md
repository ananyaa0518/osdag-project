# OSDAG Bridge UI Screening Task

This repository contains the full-stack implementation for the OSDAG Bridge UI Screening Task, built using React (Vite + Tailwind CSS) and Django REST Framework.

## Project Structure
- `frontend/` - React frontend application
- `backend/` - Django API backend

## Prerequisites
- Node.js (v16 or higher)
- Python (3.8 or higher)

## Setup Instructions

### 1. Backend Setup (Django)

Navigate to the `backend` directory and set up the virtual environment:
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt # (if available) or install django, djangorestframework, django-cors-headers
```

**Initialize Database & Load Data:**
The `db.sqlite3` file is intentionally excluded from version control. You must run migrations and load the provided data fixtures containing real location tables:
```bash
python manage.py migrate
python manage.py loaddata locations/fixtures/locations.json
```

**Run the Server:**
```bash
python manage.py runserver
```
The backend API will be available at `http://127.0.0.1:8000`.

### 2. Frontend Setup (React/Vite)

Open a new terminal, navigate to the `frontend` directory:
```bash
cd frontend
npm install
```

**Start the Development Server:**
```bash
npm run dev
```
The React development server will start on `http://localhost:5173`. Make sure the Django API is running concurrently for the location dropdowns to fetch data correctly.

## Features Implemented
- Complete Responsive UI matching the layout constraints with Left panel and right panel configuration.
- React components logically separated (Form Modules, Custom Logic Hooks, UI Components).
- Custom Location Modal & Auto-Populated Location APIs dependent on user selection.
- Geometry calculation modal that guarantees the mathematical bounds of spacing, overhang, and total girders.
