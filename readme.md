# 💰 Personal Finance Tracker API

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-Framework-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)


A modern and secure RESTful API for managing personal finances — including authentication, transactions, admin controls, file uploads, and full API documentation with Swagger.

---

## 🚀 Features

* 🔐 User Authentication (JWT-based)
* 💳 Transaction Management (CRUD)
* 📊 Monthly Summary Reports
* 🛡️ Security with Helmet & Rate Limiting
* 🌍 CORS Enabled
* 🧾 API Logging with Morgan
* 📂 File Upload Support
* 📖 Interactive API Docs (Swagger)

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT
* **Documentation:** Swagger (swagger-jsdoc + swagger-ui-express)
* **Security:** Helmet, express-rate-limit
* **Logging:** Morgan

---

## 📁 Project Structure

```
project-root/
│
├── routes/
│   ├── auth.js
│   ├── transactionRoutes.js
│   ├── admin.js
│   └── upload.js
│
├── controllers/
├── models/
├── middlewares/
│   └── errorHandler.js
│
├── utils/
│   └── swagger.js
│
├── .env
├── index.js
└── package.json
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/finance-tracker-api.git
cd finance-tracker-api
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
NODE_ENV=development

# Local MongoDB
MONGO_URI_DEV=mongodb://localhost:27017/finance-tracker

# Production MongoDB
MONGO_URI_PRO=your_production_mongo_uri

JWT_SECRET=your_secret_key
```

---

### 4. Run the server

```bash
npm run dev
```

---

## 🌐 API Endpoints

### 🔐 Auth Routes

```
POST   /api/auth/register
POST   /api/auth/login
```

### 💳 Transactions

```
GET    /api/transactions
POST   /api/transactions
PUT    /api/transactions/:id
DELETE /api/transactions/:id
GET    /api/transactions/summary/monthly
```

### 👨‍💼 Admin

```
GET    /api/admin
```

### 📂 Upload

```
POST   /api/upload
```

---

## 📖 API Documentation

Swagger UI available at:

```
http://localhost:5000/docs
```

---

## 🔒 Security Features

* Helmet for HTTP headers protection
* Rate limiting (100 requests per 15 minutes per IP)
* JWT authentication
* Input validation (recommended to extend)

---

## 🧪 Testing

Use tools like:

* Postman
* Thunder Client (VS Code)

---

## ❗ Common Issues

### ❌ Swagger not working

* Ensure `swagger-ui-express` is installed
* Check `swagger.js` export (`swaggerSpecs`)
* Restart server

### ❌ MongoDB connection failed

* Verify `.env` variables
* Check MongoDB is running

---

## 📌 Future Improvements

* ✅ Add role-based access control
* ✅ Add pagination & filtering
* ✅ Add frontend dashboard (React)
* ✅ Deploy to cloud (Render / Vercel / Railway)

---

## 👤 Author

**Hayat Mohamud**
Full-Stack Developer 🚀

---

## 📄 License

This project is licensed under the MIT License.
