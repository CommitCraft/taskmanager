# Fullstack Task Manager (MERN)

## Backend
[Click here](https://tm-holdler-baclend.vercel.app/)

## Frontend
[Click here](https://tm-holdler-frontend.vercel.app/)

## Website Features

I've created a complete multi-page website with:

### Navigation Bar:
- Responsive design with mobile menu
- Active link highlighting
- Smooth transitions

### Pages:
- **Home:** Landing page with features and CTAs

### Admin Features:
1. **User Management:**
    - Create admin accounts.
    - Add and manage team members.

2. **Task Assignment:**
    - Assign tasks to individual or multiple users.
    - Update task details and status.

3. **Task Properties:**
    - Label tasks as todo, in progress, or completed.
    - Assign priority levels (high, medium, normal, low).
    - Add and manage sub-tasks.

4. **Asset Management:**
    - Upload task assets, such as images.

5. **User Account Control:**
    - Disable or activate user accounts.
    - Permanently delete or trash tasks.

### User Features:
1. **Task Interaction:**
    - Change task status (in progress or completed).
    - View detailed task information.

2. **Communication:**
    - Add comments or chat to task activities.

### General Features:
1. **Authentication and Authorization:**
    - User login with secure authentication.
    - Role-based access control.

2. **Profile Management:**
    - Update user profiles.

3. **Password Management:**
    - Change passwords securely.

4. **Dashboard:**
    - Provide a summary of user activities.
    - Filter tasks into todo, in progress, or completed.

### Technologies Used:
#### Frontend:
- React (Vite)
- Redux Toolkit for State Management
- Headless UI
- Tailwind CSS

#### Backend:
- Node.js with Express.js

#### Database:
- MongoDB for efficient and scalable data storage.

### Additional Pages:
- **About:** Company information, values, and team section
- **Contact:** Contact form and information

### Footer:
- Company information
- Quick links
- Social media links
- Contact details

## Meta Tags
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="TaskFlow: A cloud-based task management platform built on the MERN stack. Manage tasks, collaborate with your team, and improve productivity with our intuitive and secure solution.">
<meta name="keywords" content="Task Management, MERN Stack, React, Node.js, MongoDB, Express.js, Team Collaboration, Productivity, Task Tracker">
<meta name="author" content="TaskFlow Team">
<title>TaskFlow - Efficient Task Management for Teams</title>
```

## Overview
The Cloud-Based Task Manager is a web application designed to streamline team task management. Built using the MERN stack (MongoDB, Express.js, React, and Node.js), this platform provides a user-friendly interface for efficient task assignment, tracking, and collaboration.

### Why/Problem?
In a dynamic work environment, effective task management is crucial for team success. Traditional methods of task tracking through spreadsheets or manual systems can be cumbersome and prone to errors. The Cloud-Based Task Manager aims to address these challenges by providing a centralized platform for task management, enabling seamless collaboration and improved workflow efficiency.

### Background
With the rise of remote work and dispersed teams, there is a growing need for tools that facilitate effective communication and task coordination. The Cloud-Based Task Manager addresses this need by leveraging modern web technologies to create an intuitive and responsive task management solution.

## SETUP INSTRUCTIONS

### Server Setup

#### Environment Variables
Create a `.env` file in the server folder with the following variables:
```env
MONGODB_URI=your MongoDB URL
JWT_SECRET=any secret key - must be secured
PORT=8800 or any port number
NODE_ENV=development
```

#### Set Up MongoDB:
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create an account and log in.
3. Create a new cluster and configure settings.
4. Create a database user and set up an IP whitelist.
5. Connect to the cluster and configure the `.env` file.

#### Steps to Run Server
1. Open the project in any editor.
2. Navigate into the server directory: `cd server`.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the server.

### Client Setup

#### Environment Variables
Create a `.env` file in the client folder with:
```env
VITE_APP_BASE_URL=http://localhost:8800
VITE_APP_FIREBASE_API_KEY=Firebase API key
```

#### Steps to Run Client
1. Navigate into the client directory: `cd client`.
2. Run `npm install` to install dependencies.
3. Run `npm start` and open `http://localhost:3000` in a browser.

### For Support, Contact:
(Contact details here)

