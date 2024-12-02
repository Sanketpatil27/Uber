
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
- **`registerUser(req, res, next)`**:
  - **Purpose**: Handles user registration.
  - **Workflow**:
    1. Validates incoming request data using `express-validator`.
    2. Extracts `fullname`, `email`, and `password` from the request body.
    3. Hashes the password using `userModel.hashPassword`.
    4. Creates a new user in the database via `userService.createUser`.
    5. Generates a JWT using the `generateAuthToken` method on the user instance.
    6. Returns a success response with the token and user details.
  - **Error Handling**: Returns `400` status with validation errors if input is invalid.

---
