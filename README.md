# 🍽️ Restaurant POS System

A full-stack **Restaurant Point of Sale (POS) System** built using React, TypeScript, Node.js, Express, and MySQL.

The application provides restaurant staff with a simple interface for managing menu items, processing customer orders, tracking inventory, handling checkout, monitoring seating, and viewing restaurant operations.

## ✨ Features

- 📊 Restaurant dashboard
- 🍕 Menu management
- ➕ Add new menu items
- ✏️ Edit existing menu items
- 🗑️ Delete menu items
- 🛒 Shopping cart with quantity management
- 💳 Checkout workflow
- 🧾 Order creation and order history
- 📦 Inventory and stock management
- ⚠️ Low-stock indicators
- 🪑 Restaurant seating management
- 🔗 REST API integration
- 🗄️ MySQL database persistence

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

### Database
- MySQL

### Development Tools
- Git
- GitHub
- Postman
- MySQL Workbench
- Visual Studio Code

## 🏗️ Application Architecture

```text
React + TypeScript Frontend
            ↓
        REST APIs
            ↓
Node.js + Express Backend
            ↓
        MySQL Database
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
│   │   └── pages/
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

## ⚙️ Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/KRavalii/restaurant-pos-system.git
cd restaurant-pos-system
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example`.

```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=restaurant_pos
DB_PORT=3306
PORT=5000
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs locally using Vite.

## 🧪 API Testing

REST APIs were tested using **Postman**, including:

- GET requests for retrieving data
- POST requests for creating resources
- PUT requests for updating resources
- DELETE requests for removing resources

## 🔐 Security

Sensitive environment variables such as database credentials are stored in `.env` files.

The `.env` files are excluded from Git using `.gitignore`. Example environment configuration is provided through `.env.example`.

## 🚀 Future Enhancements

- User authentication
- Role-based access for Admin and Cashier
- Cloud deployment
- Automatic inventory deduction
- Payment gateway integration
- Advanced sales analytics
- AI-powered Restaurant Manager Copilot
- LLM-powered restaurant insights
- Agentic AI inventory assistant with human approval

## 👩‍💻 Author

**Sai Ravali Katta**

Full Stack / Software Engineer