The frontend is built with **React and TypeScript**, providing a user-friendly interface for authentication and accessing protected content.

Users can **sign up**, **log in**, and access a **protected dashboard** only if authenticated with a valid JWT token. 

## 🛠️ **Features**
- **User Registration & Login**
- **JWT-based Authentication** (Access & Refresh Tokens)
- **Protected Routes** (Only accessible with a valid token)
- **Cross-Origin Support** for handling requests between separate servers
- **Simple Dashboard** displaying user data
- **Logout Functionality**

## 📂 **Tech Stack**
- **Frontend**: React, TypeScript, Axios, React Router

## 📑 **Folder Structure**
```
├── frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── api.ts (API handler)
│   │   ├── routes.tsx (Frontend routes)
│   │   └── App.tsx
└── README.md
```

## 🚀 **Getting Started**

### **Frontend Setup**
1. Navigate to the frontend folder:
```sh
cd frontend
```
2. Install dependencies:
```sh
npm install
```
3. Start the development server:
```sh
npm start
```

## 🤝 **Contributing**
Feel free to fork the repo, submit issues, or open PRs!

Let me know if you want me to refine or add anything! 🚀

