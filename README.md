# MERN Book Search Engine

This project is a full-stack MERN (MongoDB, Express, React, Node.js) application that allows users to search for books using the Google Books API, save their favorite books, and manage their personal book list. The app features user authentication, a modern React frontend, and a GraphQL API powered by Apollo Server.

## Features

- **User Authentication:** Sign up, log in, and log out securely with JWT-based authentication.
- **Book Search:** Search for books using the Google Books API.
- **Save Books:** Save books to your personal list when logged in.
- **View & Remove Saved Books:** View your saved books and remove them as needed.
- **GraphQL API:** All user and book data is managed via a robust GraphQL API (no REST except for Google Books search).
- **Responsive UI:** Built with React, React Router, and Bootstrap for a modern, responsive experience.

## Technologies Used

- **Frontend:** React, TypeScript, Apollo Client, React Router, Bootstrap
- **Backend:** Node.js, Express, Apollo Server (GraphQL), Mongoose, TypeScript
- **Database:** MongoDB (local or Atlas)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local or Atlas)

### Installation
1. Clone the repository and navigate to the `Develop` folder:
   ```bash
   git clone <repo-url>
   cd 18-MERN-and-Authentication/02-Challenge/Develop
   ```
2. Install dependencies for both client and server:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
3. Set up your environment variables in `server/.env`:
   ```env
   MONGODB_URI='mongodb://127.0.0.1:27017/googlebooks'
   JWT_SECRET_KEY='yourSecretKey'
   ```

### Running the App (Development)
1. Start the backend server:
   ```bash
   cd server
   npx tsc
   npm start
   ```
2. In a new terminal, start the frontend:
   ```bash
   cd client
   npm run dev
   ```
3. Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
1. From the `Develop` folder, run:
   ```bash
   npm run build
   ```
2. Deploy the contents of the `client/dist` and `server/dist` folders as needed.

## Usage
- **Search for Books:** Use the search bar to find books by title, author, or keyword.
- **Sign Up / Log In:** Create an account or log in to save books.
- **Save Books:** Click "Save this Book!" to add a book to your list.
- **View Saved Books:** Navigate to the "Saved Books" page to see your list.
- **Remove Books:** Click "Delete this Book!" to remove a book from your saved list.
- **Log Out:** Use the navigation bar to log out.

## Project Structure
- `client/` - React frontend
- `server/` - Node.js/Express/Apollo backend
- `server/src/models/` - Mongoose models for User and Book
- `server/src/schemas/` - GraphQL typeDefs and resolvers
- `server/src/utils/` - Authentication utilities

## Deployment
- Link to Render deployment: <https://columbia-coding-bootcamp-module-18.onrender.com>

## License
This project is licensed under the MIT License.

---