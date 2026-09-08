# 🍽️ Restaurant POS System

A full-stack **Restaurant Point of Sale (POS) System** built with React, TypeScript, Node.js, Express, and PostgreSQL.

The application provides a responsive interface for restaurant operations including menu management, order processing, checkout, inventory tracking, seating management, and real-time dashboard metrics.

The project is deployed using **Vercel** for the frontend, **Render** for the backend REST API, and **Supabase PostgreSQL** for cloud database persistence.

## 🌐 Live Application

**Frontend:**  
https://restaurant-pos-system-gules.vercel.app

**Backend API:**  
https://restaurant-pos-system-pr0i.onrender.com

> The backend is hosted on Render's free tier, so the first request after a period of inactivity may take a few seconds while the service starts.

## ✨ Features

- 📊 Restaurant dashboard with revenue and operational metrics
- 🍕 Menu management
- ➕ Add new menu items
- ✏️ Edit existing menu items
- 🗑️ Delete menu items
- 🛒 Shopping cart with quantity management
- 💳 Checkout workflow
- 🧾 Order creation and order history
- 📦 Inventory and stock management
- ⚠️ Low-stock indicators
- 🪑 Restaurant seating and table-status management
- 🔄 Dynamic table status updates
- 🔗 REST API integration
- 🗄️ PostgreSQL database persistence
- 📱 Responsive desktop and mobile interface
- ☁️ Cloud deployment

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend

- Node.js
- Express.js
- TypeScript
- REST APIs

### Database

- PostgreSQL
- Supabase

### Deployment

- Vercel — Frontend
- Render — Backend
- Supabase — PostgreSQL Database

### Development & Testing Tools

- Git
- GitHub
- Postman
- Visual Studio Code

## 🏗️ Application Architecture

```text
             User
               │
               ▼
    React + TypeScript Frontend
          (Vercel)
               │
               │ REST API
               ▼
     Node.js + Express Backend
           (Render)
               │
               ▼
       PostgreSQL Database
          (Supabase)
```

## 📁 Project Structure

```text
restaurant-pos-system/
│
├── backend/
│   ├── src/
│   │   ├── db.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔌 REST API

### Menu

```text
GET     /api/menu
POST    /api/menu
PUT     /api/menu/:id
DELETE  /api/menu/:id
```

### Orders

```text
GET     /api/orders
POST    /api/orders
```

### Inventory

```text
GET     /api/inventory
PUT     /api/inventory/:id
```

### Seating

```text
GET     /api/tables
PUT     /api/tables/:id
```

### Dashboard

```text
GET     /api/dashboard
```

## ⚙️ Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/KRavali11/restaurant-pos-system.git

cd restaurant-pos-system
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example`.

```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

The `DATABASE_URL` should contain a valid PostgreSQL connection string.

Start the backend:

```bash
npm run dev
```

The backend runs locally at:

```text
http://localhost:5000
```

### 3. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

Create the frontend `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Vite will display the local frontend URL in the terminal.

## 🗃️ Database

The application uses **PostgreSQL hosted on Supabase**.

The backend connects to PostgreSQL using the `pg` Node.js library and a database connection string stored securely in the `DATABASE_URL` environment variable.

Main application data includes:

- Menu items
- Orders
- Order items
- Inventory
- Restaurant tables

## 🧪 API Testing

REST APIs were tested using **Postman**, including:

- GET requests for retrieving restaurant data
- POST requests for creating menu items and orders
- PUT requests for updating menu, inventory, and seating data
- DELETE requests for removing menu items

The complete application was also tested through the React frontend against the deployed backend and PostgreSQL database.

## 📱 Responsive Design

The user interface supports both desktop and mobile layouts.

On smaller screens:

- Sidebar navigation converts into a mobile-friendly top navigation
- Dashboard cards stack vertically
- Menu cards and cart adapt to available screen width
- Checkout sections stack vertically
- Inventory cards use responsive layouts
- Restaurant seating cards adapt to mobile screens

## 🔐 Environment & Security

Sensitive configuration such as database credentials is stored in `.env` files.

Environment files containing secrets are excluded from Git using `.gitignore`. Example environment configuration is provided through `.env.example` files.

Production environment variables are configured separately in Vercel and Render.

> Authentication is currently simplified for demonstration purposes. Production-grade authentication and authorization are planned as future enhancements.

## 🚀 Deployment

The application uses a three-tier cloud deployment architecture:

```text
Frontend
React + TypeScript
      │
      ▼
   Vercel
      │
      │ HTTPS / REST
      ▼
Backend
Node.js + Express
      │
      ▼
   Render
      │
      ▼
PostgreSQL
   Supabase
```

GitHub is used for source control, and updates to the main branch can trigger deployment updates for the connected hosting services.

## 🔮 Future Enhancements

- Secure user authentication
- Role-based access for Admin and Cashier
- Automatic inventory deduction based on orders
- Payment gateway integration
- Advanced sales analytics and reporting
- Receipt generation
- AI-powered Restaurant Manager Copilot
- LLM-powered restaurant insights
- Agentic AI inventory assistant with human approval

## 👩‍💻 Author

**Sai Ravali Katta**

Full Stack / Software Engineer