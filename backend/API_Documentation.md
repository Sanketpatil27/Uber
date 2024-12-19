
# Documentation

## File: `user.model.js`
This file defines the Mongoose schema and model for user data, along with utility methods for authentication and password management.

### Imports
- `mongoose`: Used for defining and interacting with MongoDB collections.
- `bcrypt`: Handles hashing and comparing passwords securely.
- `jsonwebtoken`: Generates JSON Web Tokens (JWT) for authentication.

### Schema Definition
- **Fields:**
  - `fullname`:
    - `firstname` (String, Required): The user's first name.
    - `lastname` (String, Optional): The user's last name.
  - `email` (String, Required, Unique): The user's email address.
  - `password` (String, Required, Hidden on query): The user's hashed password.
  - `socketId` (String, Optional): Tracks live connection ID for real-time interactions.

### Methods
- **Instance Methods**:
  - `generateAuthToken()`: Generates a JWT for the user based on their `_id`.
  - `comparePassword(password)`: Compares a plain-text password with the hashed password stored in the database.

- **Static Methods**:
  - `hashPassword(password)`: Hashes a given password using bcrypt.

---

## File: `db.js`
This file manages the database connection using Mongoose.

### Functionality
- `connectToDB()`: Connects to MongoDB using the connection string stored in `process.env.DB_CONNECT`.

### Error Handling
- Logs an error to the console if the connection fails.

---

## File: `user.controller.js`
This file contains the controller logic for handling user-related operations, such as registration.

### Imports
- `userModel`: The Mongoose model for users.
- `userService`: Service layer for user-related operations.
- `validationResult`: Middleware from `express-validator` for request validation.

### Functions
## Captain Routes

### 1. Register Captain
- **Endpoint:** `POST /register`
- **Request Body:**
  - `email` (string, required, valid email)
  - `fullname.firstname` (string, required)
  - `password` (string, required, min 6 characters)
  - `vehicle.color` (string, required)
  - `vehicle.vehicleType` (string, required)
  - `vehicle.plate` (string, required)
  - `vehicle.capacity` (integer, required, min 1)
- **Response:**
  - **201:** `{ token: string, captain: object }`
  - **400:** `{ errors: array }`

### 2. Login Captain
- **Endpoint:** `POST /login`
- **Request Body:**
  - `email` (string, required, valid email)
  - `password` (string, required, min 6 characters)
- **Response:**
  - **200:** `{ token: string, captain: object }`
  - **400:** `{ errors: array }`
  - **411:** `{ message: string }`

### 3. Get Captain Profile
- **Endpoint:** `GET /profile`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - **200:** `{ captain: object }`
  - **400:** `{ message: string }`

### 4. Logout Captain
- **Endpoint:** `GET /logout`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - **200:** `{ message: string }`

---

## User Routes

### 1. Register User
- **Endpoint:** `POST /register`
- **Request Body:**
  - `email` (string, required, valid email)
  - `fullname.firstname` (string, required, min 3 characters)
  - `password` (string, required, min 6 characters)
- **Response:**
  - **201:** `{ token: string, user: object }`
  - **400:** `{ error: array }` or `{ message: string }`

### 2. Login User
- **Endpoint:** `POST /login`
- **Request Body:**
  - `email` (string, required, valid email)
  - `password` (string, required, min 6 characters)
- **Response:**
  - **200:** `{ token: string, user: object }`
  - **401:** `{ msg: string }`

### 3. Get User Profile
- **Endpoint:** `GET /profile`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - **200:** `{ user: object }`
  - **400:** `{ message: string }`

### 4. Logout User
- **Endpoint:** `GET /logout`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:**
  - **200:** `{ message: string }`
