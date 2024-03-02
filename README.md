# School Management WebApp 
<img src="https://github.com/Danval-003/BD2-Project1/assets/77825594/e6a3ff05-58dc-4903-abad-e30ee9405ea4" alt="Nombre alternativo para la imagen" width="200"/>

## Overview

Welcome to the School Management WebApp repository! This web application is designed to facilitate the management of data for a school system using MongoDB as the database. The project is divided into two main components: Frontend and Backend.

### Frontend

The frontend is built using React with Vite, and it adheres to design and code rules defined by ESLint. Notably, it follows a no-semicolon policy. The following commands are available for the frontend:

- `npm run dev`: Start the project in production mode.
- `npm run lint`: Check for design errors using ESLint.
- `npm run gen <ComponentName>`: Generate a basic template for a component with the specified name.

### Backend

The backend utilizes an Express project for connecting with MongoDB. Similar to the frontend, ESLint is employed for code design consistency. To start the API on port 4000, use the following command:

- `npm start`: Start the API.

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
npm install
```

3. Set up the backend:

```bash
cd ../backend
npm install
```

4. Run the frontend and backend:

```bash
# In the frontend directory
npm run dev

# In the backend directory
npm start
```

Now, you should have the School Management WebApp running locally!

## Project Details

### WebApp Purpose

The project is a web application designed for the administration of various student centers within a school system.

### Database

The application uses MongoDB with a cloud instance for data management.

<img src="https://github.com/Danval-003/BD2-Project1/assets/77825594/cc9474c8-21af-42c7-bf93-5ed021e07e41" alt="Nombre alternativo para la imagen" width="600"/>

The following collections are present in the database:

#### Students

```json
[
  {
    "idGrade": "PRI05",
    "section": "C",
    "idCourse": "PHY012",
    "year": 2024,
    "percentGrade": null,
    "_id": {"$oid": "65e142dbcebd9c82a0d2444c"}
  },
  // ... other student objects
]
```

#### Teachers

```json
[
  {
    "_id": {"$oid": "65dbe766af43582c0a887a08"},
    "admissionYear": 2016,
    "age": 29,
    "courses": [
      // ... course objects
    ],
    "fullName": "Romana Righi-Cossiga",
    "gender": "F",
    "idSchool": "ETA_CA"
  },
  // ... other teacher objects
]
```

#### Grades

```json
[
  {
    "_id": {"$oid": "65de2ef352e1b421637ff5c1"},
    "courses": ["MAT001", "ENG003", "HIS005", "BIO006", "ART009", "MUS010", "PHY012", "LAN017"],
    "idGrade": "PRI04",
    "name": "4th Grade"
  },
  // ... other grade objects
]
```

#### Courses

```json
[
  {
    "_id": {"$oid": "65d517eaedc3d53ed8ab53ac"},
    "idCourse": "MAT001",
    "name": "Mathematics"
  },
  // ... other course objects
]
```

#### Schools

```json
[
  {
    "_id": {"$oid": "65d51810841193b34a05c637"},
    "idSchool": "ETA_NY",
    "location": {
      "State": "New York",
      "City": "New York",
      "Street": "5th Avenue"
    }
  },
  // ... other school objects
]
```

#### Uploads (GridFS)

Collections: `uploads.file` and `uploads.chunks`

These collections store images uploaded through GridFS.

### Data Relationships

- Reference fields: `idGrade` in Students and Teachers, `idCourse` in Teachers, `idSchool` in Teachers and Schools.
- Embedded fields: `location` in Schools.
- Arrays: `courses` in Teachers and Grades.

Feel free to explore and contribute to the School Management WebApp!
