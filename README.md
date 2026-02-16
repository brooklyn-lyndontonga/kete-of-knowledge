# Kete of Knowledge

A comprehensive platform providing accessible health and wellbeing information to whānau. This project consists of a mobile application for users, an admin panel for content management, and a backend server.

## 📂 Project Structure

The project is organized into the following key directories within `clean/`:

- **`mobile`**: The React Native (Expo) mobile application.
- **`admin`**: The React (Vite) web-based admin dashboard.
- **`server`**: The Node.js/Express backend API and SQLite database.
- **`shared`**: Shared data models and utilities.

## 🛠 Tech Stack

- **Mobile**: React Native, Expo, React Navigation, Expo Google Fonts.
- **Admin**: React, Vite.
- **Backend**: Node.js, Express, SQLite.
- **Authentication**: Custom Authentication flow (Mobile/Server).

## ✨ Features

### Mobile App
- **Authentication**: Secure login and authentication flow.
- **Resource Library**: Access to health information and resources.
- **Medicines Hub**: Management and information for medications.
- **Profile & Settings**: User personalization and app configuration.

### Admin Panel
- Web interface for managing app content and resources.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Expo Go app (for mobile testing)

### 1. Server Setup
```bash
cd clean/server
npm install
npm run dev
# Server generally runs on http://localhost:3000
```

### 2. Mobile App Setup
```bash
cd clean/mobile
npm install
npx expo start
# Scan the QR code with Expo Go
```

### 3. Admin Panel Setup
```bash
cd clean/admin
npm install
npm run dev
# Accessible via browser (usually http://localhost:5173)
```

## 📝 Usage
- Ensure the **Server** is running before starting the Mobile or Admin apps to ensure data connectivity.
