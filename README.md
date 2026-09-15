# Real-Time Chat & Messaging Platform (MERN Stack)

Full-stack real-time messaging web application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. The project demonstrates secure user authentication, bidirectional WebSocket messaging, state management with Zustand, and responsive UI design via TailwindCSS and DaisyUI.

---

## Key Features

* **Real-Time Communication**: Instant messaging delivery powered by **Socket.IO** with dynamic online/offline presence tracking.
* **Secure Authentication & Sessions**: JWT-based authentication stored in `httpOnly`, `SameSite=Strict` cookies to safeguard against XSS and CSRF attacks.
* **Defensive Backend Architecture**:
  * Request security headers via `helmet`
  * NoSQL injection prevention with `express-mongo-sanitize`
  * Brute-force protection using `express-rate-limit`
  * Password hashing using `bcryptjs`
* **Reactive Frontend & State Management**:
  * Global UI state handled using **Zustand**
  * Real-time socket sync via React Context API
  * Optimistic updates and audio-visual cues (sound alerts, incoming message shake animation)
  * Skeleton loaders for improved perceived performance

---

## Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router DOM 6, Zustand, TailwindCSS, DaisyUI |
| **Backend** | Node.js, Express.js (ES Modules) |
| **Database** | MongoDB, Mongoose ODM |
| **Real-Time** | Socket.IO (Client & Server) |
| **Security** | JSON Web Tokens (JWT), Helmet, Express Rate Limit, Express Mongo Sanitize, BcryptJS |

---

## Architecture & Project Structure

```text
├── backEnd/
│   ├── controllers/      # Route handlers (auth, messages, users)
│   ├── db/               # Database connection logic (Mongoose)
│   ├── middleware/       # Route guards (protectRoute via JWT verification)
│   ├── models/           # Mongoose schemas (User, Message, Conversation)
│   ├── routes/           # Express endpoint definitions
│   ├── socket/           # Socket.IO lifecycle & socket mapping
│   ├── utils/            # JWT token & cookie generation
│   └── server.js         # Server entry point & global security middleware
├── frontEnd/
│   ├── src/
│   │   ├── components/   # Modular UI elements (Messages, Sidebar, Skeletons)
│   │   ├── context/      # React Contexts (AuthContext, SocketContext)
│   │   ├── hooks/        # Custom React data-fetching & socket-listener hooks
│   │   ├── pages/        # Route views (Home, Login, SignUp)
│   │   └── zustand/      # Global state stores (useConversation)
│   └── vite.config.js    # Vite tooling & dev-server proxy configuration
└── package.json          # Root scripts for build and deployment orchestration
```

---

## Getting Started

### Prerequisites

* **Node.js**: `v18.x` or later
* **npm**: `v9.x` or later
* **MongoDB**: A local instance or a MongoDB Atlas cluster URI

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### Installation & Local Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd <project-folder>
   ```

2. **Install root & client dependencies**
   ```bash
   npm run build
   ```
   *(Or install manually: `npm install && cd frontEnd && npm install`)*

3. **Run the development servers**
   * **Backend** (API & Sockets on `http://localhost:5000`):
     ```bash
     npm run server
     ```
   * **Frontend** (Vite Dev Server on `http://localhost:3000`):
     ```bash
     cd frontEnd
     npm run dev
     ```

---

## Core API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user | Public |
| `POST` | `/api/auth/login` | Authenticate user & issue cookie | Public |
| `POST` | `/api/auth/logout` | Invalidate session cookie | Public |
| `GET` | `/api/users` | Fetch sidebar contact list (excluding current user) | Protected |
| `GET` | `/api/messages/:id` | Fetch conversation history with target user | Protected |
| `POST` | `/api/messages/send/:id` | Send a message to target user via HTTP & WebSocket | Protected |
