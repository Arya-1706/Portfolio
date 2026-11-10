# Arya Jha | Developer Portfolio

A full-stack developer portfolio built using the **MERN stack**, featuring a dynamic project showcase, contact management system, and a protected admin dashboard.

The application showcases projects, technical skills, and development experience through a responsive frontend backed by a RESTful API.

---

## Overview

This portfolio goes beyond a traditional static website. It uses React for the frontend, Node.js and Express.js for the backend, and MongoDB for persistent data storage.

Project information is dynamically fetched from the backend, contact form submissions are stored in MongoDB, and an authenticated admin dashboard provides project and message management.

## Features

### Public Portfolio
- Responsive personal portfolio with custom UI design.
- Dynamic project listing fetched from the backend.
- Individual project detail pages using URL slugs.
- About, development process, and technical skills sections.
- Resume access and social profile links.
- Contact form with client-side validation.
- Scroll animations and responsive navigation.

### Admin Dashboard
- JWT-based admin authentication.
- Protected admin routes.
- Create, edit, and delete projects.
- Manage project descriptions, technologies, links, and highlights.
- View contact form submissions.
- Mark messages as read and delete messages.

### Backend & Security
- RESTful API built with Express.js.
- MongoDB integration using Mongoose.
- Password hashing using bcrypt.
- JWT authentication and protected endpoints.
- Request validation using Zod.
- Rate limiting for sensitive endpoints.
- Security headers using Helmet.
- Centralized error handling.
- Optional email notifications through Nodemailer.

### SEO & Accessibility
- Dynamic document titles.
- Meta descriptions and Open Graph metadata.
- Custom Open Graph preview image.
- `robots.txt` and `sitemap.xml`.
- Semantic HTML and accessible form labels.
- Keyboard navigation and reduced-motion support.

---

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, Vite, Tailwind CSS |
| Routing | React Router |
| Animations | Framer Motion |
| HTTP Client | Axios |
| Form Handling | React Hook Form, Zod |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcryptjs |
| Validation | Zod |
| Security | Helmet, Express Rate Limit |
| Email | Nodemailer |
| Development Tools | Git, GitHub, Postman |

---

## Project Structure

```text
Portfolio/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── admin/
│       │   └── ...
│       ├── context/
│       ├── hooks/
│       ├── lib/
│       ├── pages/
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── validators.js
│   ├── seed.js
│   └── server.js
│
├── .gitignore
└── README.md
```

---

## Application Architecture

The application follows a client-server architecture with a modular backend structure.

```text
                 VISITOR / ADMIN
                        |
                        v
                React Frontend
                   (Vite)
                        |
                        v
                 Axios API Client
                        |
                        v
                Express REST API
                        |
          +-------------+-------------+
          |             |             |
          v             v             v
        Routes      Middleware    Controllers
                       |
                Authentication
                   Validation
                  Rate Limiting
                        |
                        v
                     Mongoose
                        |
                        v
                      MongoDB
```

### Request Flow

1. A visitor interacts with the React frontend.
2. Axios sends an HTTP request to the Express API.
3. Express routes direct the request to the appropriate middleware and controller.
4. Middleware handles authentication, validation, and rate limiting where required.
5. Controllers execute business logic and interact with MongoDB through Mongoose.
6. The backend returns a JSON response.
7. React updates the interface based on the response.

For protected admin operations, the frontend attaches a JWT through the Axios request interceptor. The backend verifies the token before allowing access to protected resources.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- MongoDB Atlas account or a local MongoDB instance
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Arya-1706/Portfolio.git
cd Portfolio
```

### 2. Set Up the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory using `.env.example` as a reference.

Configure the required environment variables:

```env
PORT=5000
CLIENT_URL=http://localhost:5173

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

DNS_SERVERS=8.8.8.8,1.1.1.1

# Optional email configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email
SMTP_PASS=your_email_app_password
NOTIFY_TO=your_notification_email
```

Use your own credentials. Never commit your actual `.env` file.

### 3. Seed the Database

```bash
npm run seed
```

This initializes or updates the admin user. Project seeding can be enabled separately in `seed.js` when required.

### 4. Start the Backend

```bash
npm run dev
```

The backend runs at:

`http://localhost:5000`

Health check:

`GET http://localhost:5000/api/health`

### 5. Set Up the Frontend

Open another terminal:

```bash
cd client
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend runs at:

`http://localhost:5173`

The Vite development server proxies `/api` requests to the backend.

For production, configure `VITE_API_URL` with the deployed backend API base URL, including `/api`.

---

## API Documentation

Base URL: `/api`

### Projects

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/projects` | Fetch all projects | Public |
| GET | `/projects/:slug` | Fetch project details | Public |
| POST | `/projects` | Create a project | Protected |
| PUT | `/projects/:id` | Update a project | Protected |
| DELETE | `/projects/:id` | Delete a project | Protected |

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/auth/login` | Authenticate admin and generate JWT | Public |

### Contact & Messages

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/contact` | Submit a contact message | Public |
| GET | `/messages` | Fetch submitted messages | Protected |
| PATCH | `/messages/:id/read` | Mark a message as read | Protected |
| DELETE | `/messages/:id` | Delete a message | Protected |

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check backend status |

Protected endpoints require a valid JWT in the request header:

```http
Authorization: Bearer <your_token>
```

---

## Database Models

The application uses three primary MongoDB collections:

- **User:** Stores admin account information and hashed passwords.
- **Project:** Stores project descriptions, technologies, links, highlights, images, and display ordering.
- **Message:** Stores contact form submissions, including sender details, message content, and read status.

---

## Production Build

Build the frontend:

```bash
cd client
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Start the backend using its production script:

```bash
cd server
npm start
```

Make sure production environment variables and the frontend API URL are configured before deployment.

---

## Security

- Environment variables are excluded from version control.
- Admin passwords are stored as bcrypt hashes.
- JWT authentication protects administrative endpoints.
- Zod validates incoming request data.
- Rate limiting helps protect sensitive endpoints.
- Helmet adds HTTP security headers.
- Contact form submissions are validated before being stored.

---

## Future Improvements

- Add project screenshots and detailed case studies.
- Implement project filtering and categorization.
- Add automated frontend and backend tests.
- Integrate analytics and visitor insights.
- Complete production SEO configuration.
- Improve deployment monitoring.

---

## Author

**Arya Jha**

B.Tech — Computer Science and Business Systems
Institute of Engineering and Technology, DAVV, Indore

- GitHub: [Arya-1706](https://github.com/Arya-1706)
- LinkedIn: [Arya Jha](https://www.linkedin.com/in/aryajha17/)
- Portfolio: Coming soon

---

*Built with React, Node.js, Express.js, and MongoDB.*