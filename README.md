# **Speak Up**
### An Anonymous Social Media Application for Confessions

[API Documentation](./api-documentation.md)


SpeakUp is an anonymous social media web application that allows users to share confessions anonymously without fear of judgment.

### Key Features

- User authentication with anonymous handles
- Posting textual confessions
- Commenting and voting on confessions  
- User feed, profile, and trending feed
- Reporting abusive content
- Admin dashboard for moderation

## Architecture

SpeakUp follows a three-tier architecture:

### Frontend 

- ReactJS for UI
- React Router for routing
- TailwindCSS for styling
- Form validation using Formik & Yup

### Backend

- Node.js runtime
- Express framework for API endpoints 
- JWT authentication
- Bcrypt password hashing

### Database

- MySQL relational database
- Sequelize ORM

## Core Libraries

### Frontend

- React 
- React Router
- Tailwind CSS
- Formik
- Yup
- Axios

### Backend

- Express
- JWT
- BcryptJS
- Sequelize
- MySQL2

## Key Algorithms

- Trending feed algorithm


# Installation Guide

## Prerequisites

- Node.js v16+
- MySQL database
- npm package manager

## Steps

1. Clone the repo

```zsh
git clone https://github.com/itsankitbhusal/speakup
```

2. Install backend dependencies

```zsh
cd backend
npm install
```

3. Create a `.env` file with database and API credentials

4. To run seeders

```zsh
npm run seed seeders/<seederFile>.js
``` 

5. Install frontend dependencies

```zsh
cd frontend
npm install
```

6. Create `.env` file with API url

7. Start development servers

```zsh
// Backend
npm run server

// Frontend
npm run dev
```

Frontend at http://localhost:5173 <br >
Backend at http://localhost:5001