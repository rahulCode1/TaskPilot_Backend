# Workasana API

An REST API where you can browse, add, edit & view detailed task.
Built with React Express/Node backend, MongoDB, database & JWT-based authentication.

---

## Demo Link

[Live API](https://fsp-1-assignment-backend-mu.vercel.app)

---

## Quick Start

```
git clone https://github.com/rahulCode1/Workasana_Backend.git
cd workasana_backend
npm install
npm start  # or `npm start`
```

---

## Technologies

- Node JS
- Express
- MongoDB
- JWT

---

## Features

**Dashboard**

- Display a list of all projects
- View all tasks
- View full task details.
- Authenticated user can edit task.
- Display all tasks via team.

**Setting**

- All tasks (Authenticated user can delete tasks.)
- All projects (Authenticated user can delete projects.)
- All team (Authenticated user can delete team.)

**Authentication**

- User Signup & Login with JWT
- Protected routes for add, edit, delete tasks (Only add & delete project, team).

---

## Environment Variables

```
PORT=80
MONGODB=XXXXXXXXXXXXXX
JWT_SECRET=XXXXXX
```

## API Reference

### **GET /api/task**

List of all tasks
Sample Response:

```
[
    {
        id, name, project, ...
    }, ...
]
```

### **POST /api/task**

Add new task
Sample Response

```
{
    id, name, project, ...
}
```

### **Get /api/task/:id**

Task details
Sample Response

```
{
    id, name, project, ...
}
```

### **Patch /api/task/:id**

Edit task

### **Delete /api/task/:id**

Delete task

### **Post /api/project**

Add project
Sample response:

```
{
    id, name, description
}
```

### **Get /api/project**

Get all projects
Sample response:

```
[
    {
        id, name, description, ...
    }   , ...
]
```

### **Delete /api/project/:id**

Delete project

### **Get /api/team**

Get all team
Sample response

```
[
    {
        id, name, description, ...
    }, ...
]
```

### **Post /api/team**

Add team
Sample response

```
{
    id, name, description
}
```

### **Delete /api/team/:id**

Delete team

### **Post /api/tags**

Add tag
Sample response:

```
{
    name
}
```

### **Get /api/tags**

Get all tags
Sample response:

```
[
    {
        name
    }, ...
]
```

### **Post /api/user/signup**

Add user
Sample response:

```
{
    name, email, password
}
```

### **Post /api/user/login**

User login
Sample response:
{
userId, token
}

---

## Contact

For bugs or feature requests, please reach out to rahulkumawat50665@gmail.com
