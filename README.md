# School Management WebApp

## Overview

Welcome to the School Management WebApp repository! This web application is designed to facilitate the management of data for a school system using MongoDB as the database. The project is divided into two main components: Frontend and Backend.

### Frontend

The frontend is built using React with Vite, and it adheres to design and code rules defined by ESLint. Notably, it follows a no-semicolon policy. The following commands are available for the frontend:

- `yarn dev`: Start the project in production mode.
- `yarn lint`: Check for design errors using ESLint.
- `yarn gen <ComponentName>`: Generate a basic template for a component with the specified name.

Feel free to use `npm` instead of `yarn` for the commands mentioned above.

### Backend

The backend utilizes an Express project for connecting with MongoDB. Similar to the frontend, ESLint is employed for code design consistency. To start the API on port 4000, use the following command:

- `yarn start`: Start the API.

You can also use `npm` for the backend commands.

## Getting Started

Follow these steps to get the School Management WebApp up and running on your local machine:

1. Clone this repository:

```bash
git clone https://github.com/Danval-003/BD2-Proyect1.git
cd BD2-Proyect1
```

2. Set up the frontend:

```bash
cd frontend
yarn install
```

3. Set up the backend:

```bash
cd ../backend
yarn install
```

4. Run the frontend and backend:

```bash
# In the frontend directory
yarn dev

# In the backend directory
yarn start
```

Now, you should have the School Management WebApp running locally!
