# OrganizeNow

OrganizeNow is a comprehensive application designed to help you manage your tasks, notes, and schedules efficiently. The project combines two powerful tools: **iNotebook** for secure note-taking and **Schedulr** for effective time management. With OrganizeNow, users can seamlessly switch between managing their notes and organizing their daily schedules, all within a single application.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)

## Features

### iNotebook
- **User Authentication:** Secure login and registration functionality.
- **Note Management:** Users can create, edit, and delete their notes.
- **User-specific Data:** Each user's notes are accessible only to them; no one else can view or modify them.
- **Responsive UI:** A modern, user-friendly interface that works across different devices.
- **API Integration:** Backend API endpoints handle all user and note-related operations.

### Schedulr
- **Timetable Management:** View and manage a timetable with up to 31 days.
- **Edit and View Modes:** Easily toggle between editing and viewing your schedule.
- **Customizable Schedule:** Add and remove rows to tailor your timetable according to your needs.
- **Responsive Design:** The application is designed to be intuitive and responsive, making it easy to use on both desktop and mobile devices.

## Tech Stack

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **React.js**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**

## Installation

### Prerequisites
- Node.js and npm installed on your system.
- MongoDB installed and running.

### Steps
1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/OrganizeNow.git
    cd OrganizeNow
    ```

2. **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```

3. **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

4. **Setup environment variables:**
    - Create a `.env` file in the backend directory.
    - Add the following variables:
      ```bash
      MONGO_URI=<your-mongodb-uri>
      JWT_SECRET=<your-jwt-secret>
      ```

5. **Run the application:**
    - Start the backend server:
      ```bash
      cd backend
      npm start
      ```
    - Start the frontend server:
      ```bash
      cd ../frontend
      npm start
      ```

6. **Open the application in your browser:**
    ```bash
    http://localhost:3000
    ```

## Usage

### iNotebook
- **Login/Register:** Users must register an account or log in to access their notes.
- **Create Note:** After logging in, users can create a new note.
- **Edit Note:** Users can modify any of their existing notes.
- **Delete Note:** Users can delete any of their notes.

### Schedulr
- **View Timetable:** Users can view their timetable and manage tasks for up to 31 days.
- **Edit Timetable:** Toggle to edit mode to update tasks, add or remove rows.
- **Customize Schedule:** Adjust the schedule to fit your specific needs.

## API Endpoints

### User Authentication
- **POST** `/api/auth/createuser`: Create a new user.
- **POST** `/api/auth/login`: Login with existing credentials.
- **POST** `/api/auth/logout`: Logout the current user.

### Note Management (iNotebook)
- **GET** `/api/notes/fetchallnotes`: Fetch all notes for the logged-in user.
- **POST** `/api/notes/addnote`: Add a new note.
- **PUT** `/api/notes/updatenote/:id`: Update an existing note.
- **DELETE** `/api/notes/deletenote/:id`: Delete a note.

### Schedule Management (Schedulr)
- **GET** `/api/schedule/fetchschedule`: Fetch the user's current schedule.
- **POST** `/api/schedule/updateschedule`: Update the user's schedule.
- **POST** `/api/schedule/addrow`: Add a new row to the timetable.
- **DELETE** `/api/schedule/deleterow/:id`: Delete a row from the timetable.

## Screenshots

**SignUp Page**

![signUp](images/signUp.png)

**iNotebook Page**

![signUp](images/iNotebook.png)

**Schedulr Page**

![signUp](images/schedulr.png)

**About Page**

![signUp](images/about.png)


## 🙏 Thank You 🙏
