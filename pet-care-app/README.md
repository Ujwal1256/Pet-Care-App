# 🐾 Pet Care App

## Introduction

Pet Care App is a complete pet health and management system where users can register/login and manage multiple aspects of their pets' daily needs. Users can monitor appointments, medication, health metrics, and set reminders — all in one place. The app helps pet owners stay on top of their pets' well-being with an intuitive and mobile-friendly interface.

---

## Project Type

**Fullstack**  
Frontend: React + Redux Toolkit  
Backend: Firebase (Auth + Firestore)  
Database: Firebase Firestore

---

## Deployed App

- Frontend: [https://pet-care-app-for-all.netlify.app](https://pet-care-app-for-all.netlify.app)
- Backend: Firebase Functions (used implicitly through Firestore/Firebase Auth)
- Database: Firebase Firestore

---

## Directory Structure

```bash
pet-care-app/
├── src/
│ ├── components/ # Reusable UI components
│ ├── features/ # Redux slices for each module
│ ├── firebase/ # Firebase configuration
| ├── redux/  # Contains store.js
│ ├── pages/ # Main routes/pages
| ├── utils/ # Reusable functions eg.ToastUtils.js
│ ├── App.js
│ ├── index.js
├── public/
├── package.json

```

---

## 🎥 Video Walkthrough of the Project

[🔗 Short demo walkthrough (1-3 min)](https://your-video-link.com)

## 🧠 Video Walkthrough of the Codebase

[🔗 Short codebase tour (1-5 min)](https://your-code-video-link.com)

---

## ✨ Features

- 🔐 Email/password authentication
- 🐶 Add/view/manage pets
- 🗓 Add vet or custom reminders
- 💊 Add/manage medications
- 📈 Track pet weight with charts
- 💡 Responsive design
- 🔄 Auto-fetching data on login with Redux Toolkit

---

## 📐 Design Decisions or Assumptions

- Firebase is used for both authentication and real-time database.
- Redux is used to manage data across pages to ensure smoother user experience and state persistence.
- All routes are protected using conditional rendering and session storage checks.
- Responsive design decisions were made to prioritize mobile-friendliness.

---

## ⚙️ Installation & Getting Started

1. Clone the repo:

```bash
git clone https://github.com/Ujwal1256/Pet-Care-App.git
cd Pet-Care-App
```

2. Install dependencies:

```bash
npm install
```

3.Run the app:

```bash
npm start
```

---

## 🚀 Usage

After starting the app:

```bash

1. Register or log in.

2. Navigate the sidebar to manage:

  - Pets

  - Appointments

  - Reminders

  - Medications

  - Weight monitoring

3. Use the logout button in the navbar to end session.

```

---

## 📸 Screenshots

Here are some glimpses of the Pet Care App in action:

### Login Page

![Landing Page](![alt text](image.png))

### Login Page

![Login Page](![alt text](image-1.png))

### Dashboard

![Dashboard ](![alt text](image-2.png))

---

### 🔑 Credentials

To test the app quickly:

```bash

Email: testuser@example.com

Password: test1234

```
---
## 🔗 APIs Used

- **Firebase Auth API** — Handles secure user authentication and authorization.
- **Firebase Firestore Database** — Cloud-hosted NoSQL database for storing and syncing data in real-time.

---

## 🔌 API Endpoints

This app uses **Firebase SDKs**, so endpoints are abstracted and handled internally via Firebase services. Collections are accessed directly through Firestore.

## 🔌 API Structure

All app data is stored in a single **Firestore collection**: `users`.

Each document inside the `users` collection corresponds to a unique user, with the `document ID` being the user's UID (`uid`).

### 📂 Example Document Structure (users/uid)

```json
{
  "uid": "Amr4vqcktpgfdR620365JBGeNLJ3",
  "email": "jakhamateujwal1256@gmail.com",
  "name": "Ujwal",
  "createdAt": "2025-07-19T09:07:39.044Z",
  "mypets": [{ "name": "Bruno", "age": "4" }],
  "appointments": [{ "reason": "Regular health check" }],
  "reminders": [{ "title": "Feed Bruno", "time": "8:00 AM" }],
  "medications": [{ "medication": "Amoxicillin" }],
  "weights": {
    "timestamp": 1752918848803,
    "data": [{ "weightId": "...", "weight": 5.4 }]
  }
}
```
---

## 🧰 Technology Stack

| Technology              | Description                                |
|-------------------------|--------------------------------------------|
| **React**               | Front-end UI framework                     |
| **Redux Toolkit**       | Predictable state management               |
| **React Router DOM**    | Client-side routing                        |
| **Tailwind CSS**        | Utility-first CSS framework                |
| **Firebase Auth**       | User authentication and session management |
| **Firebase Firestore**  | Real-time NoSQL cloud database             |
| **Recharts**            | Data visualization for pet weight graphs   |

---

## 👨‍💻 Author
Ujwal Jakhamate
📧 jakhamateujwal1256@gmail.com

---