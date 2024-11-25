# Notes Taking App

A simple Notes Taking app built using **React**, **Firebase**, and **Vite**. This app allows users to create, update, delete, and pin notes with pagination support.

---

## Features

- **Create Notes**: Add a new note with a title, tagline, and body content.
- **Edit Notes**: Update existing notes.
- **Delete Notes**: Remove notes from the list.
- **Pin Notes**: Mark important notes by pinning them to the top.
- **Pagination**: Efficiently handle large amounts of notes by paginating them.
- **Responsive**: Works seamlessly on all screen sizes.

---

## How to Run the Project

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)

### 1. Clone the Repository

```bash
git clone https://github.com/OmKanhe/LeafNode.git
```
### 2. Install Dependencies

```bash
cd Ecowiser Assignment
npm install
```

### 3. Set up Firebase

1. Go to the Firebase Console.
2. Create a new project or use an existing one.
3. Add a web app to the Firebase project.
4. In the Project settings, find your Firebase configuration and copy it.
5. Create a .env file in the root of your project and add the following Firebase credentials:

```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

 ### 4. Run the App
```bash
npm run dev
```
This will start the app at http://localhost:5173.



