# FLXA User Service for IOTA

Welcome to the official repository for the FLXA User Service, developed by FLXA Indonesia. This service is designed to manage user-related operations within the FLXA ecosystem

## Overview
The FLXA User Service provides a backend solution for handling user authentication, authorization, and profile management. Built with Node.js.

## Features
1. User Authentication: Secure login and registration processes.

2. Profile Management: CRUD operations for user profiles.

3. RESTful API: Exposes endpoints for frontend integration.

4. Deployment Ready: Configured for deployment on platforms like Vercel.

## Repository Structure
```
├── src/                  # Source code directory
│   └── ...               # Application logic and route handlers
├── .eslintrc.js          # ESLint configuration
├── .gitignore            # Git ignore rules
├── index.js              # Entry point of the application
├── package.json          # Project metadata and dependencies
├── package-lock.json     # Exact versions of installed dependencies
└── vercel.json           # Vercel deployment configuration
```

## Getting Started
### Prerequisites

1. Node.js (version 14 or higher)

2. npm (comes with Node.js)

### Installation
1. Clone the repository:
```bash
git clone https://github.com/FLXA-Indonesia/FLXA-User-Service-IOTA.git
cd FLXA-User-Service-IOTA
```

2. Install dependencies:
```bash
npm install
```

### Running the Application
To start the development server:

```bash
npm start
```

The server will start on the default port (e.g., http://localhost:3000). You can modify the port and other configurations as needed.

### Deployment
The project includes a vercel.json file, making it ready for deployment on Vercel. To deploy:

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

Follow the prompts to complete the deployment process.

## API Endpoints
The service exposes the following RESTful API endpoints:
- `POST /api/register`: Register a new user.
- `POST /api/login`: Authenticate an existing user.
- `GET /api/profile`: Retrieve user profile information.
- `PUT /api/profile`: Update user profile details.
- `DELETE /api/profile`: Delete user profile.

Note: Authentication middleware ensures that only authorized users can access certain endpoints.

## Contributing
We welcome contributions to enhance the FLXA User Service. To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear messages.
4. Push your branch and open a pull request detailing your modifications.
5. Please ensure your code adheres to the project's coding standards and includes relevant tests.

## License
This project is licensed under the [GNU Affero General Public License V3](LICENSE)
