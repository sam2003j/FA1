# JWT Library and Demo Application

This repository contains two projects: `jwt-library` and `jwt-demo`. The `jwt-library` is a type-safe library for encoding, decoding, and validating JSON Web Tokens (JWTs). The `jwt-demo` is a bare NextJS application demonstrating the usage of the `jwt-library` to authenticate user requests.

## Project Structure

The repository is structured as follows:

- **jwt-library**: A type-safe library for handling JWTs.
- **jwt-demo**: A NextJS application showcasing the `jwt-library` in action.

### Setting Up the Projects

#### 1\. Clone the Repository

```
git clone
```

#### 2\. Navigate to jwt-library

```
 cd jwt-library
```

#### 3\. Install Dependencies

```
npm install
```

#### 4\. Run Tests

```
npm test
```

### JWT Demo

#### 5\. Navigate to jwt-demo

```
cd jwt-demo
```

#### 6\. Install Dependencies

```
npm install
```

#### 7\. Set Up Environment Variables

Create a .env.local file in the root of the jwt-demo project and add the following:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
JWT_SECRET=your_secret_key
```

#### 8\. Run the Development Server

```
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## JWT Library Usage

The jwt-library provides three main functions:

### encode_jwt

Creates a JWT using the given information.

```
import { encode_jwt } from 'jwt-library';  const token = encode_jwt(secret, id, payload, ttl);
```

### decode_jwt

Decodes a JWT back into its input components. Throws an error if the JWT can't be decoded.

```
import { decode_jwt } from 'jwt-library';  const decoded = decode_jwt(secret, token);
```

### validate_jwt

Internally calls the decode_jwt method and returns true if the JWT is valid, otherwise returns false.

```
import { validate_jwt } from 'jwt-library';  const isValid = validate_jwt(secret, token);
```

## JWT Library Usage

The `jwt-library` provides three main functions:

#### 1\. encode_jwt

Creates a JWT using the given information.

#### 2\. decode_jwt

Decodes a JWT back into its input components. Throws an error if the JWT can't be decoded.

#### 3\. validate_jwt

Internally calls the `decode_jwt` method and returns `true` if the JWT is valid, otherwise returns `false`.

## JWT Demo Application

The `jwt-demo` application includes the following routes:

- **/**: Home page
- **/login**: Login page
- **/protected**: Protected page (requires JWT authentication)

### Authentication Flow

1.  **Login**: Users enter their ID and role to receive a JWT.
2.  **Access Protected Page**: The JWT is stored in localStorage and used to authenticate requests to protected routes.

## Conclusion

This repository demonstrates how to create a type-safe JWT library and use it in a NextJS application to authenticate user requests. By following the setup instructions, you can run the projects locally and explore the functionality provided.
