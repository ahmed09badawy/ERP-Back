# ERP System API

A comprehensive Enterprise Resource Planning (ERP) system backend built with Node.js, Express, and MongoDB. This system provides a robust suite of modules to manage business operations efficiently, from HR and Finance to Inventory and CRM.

## 🚀 Key Features

### 🏢 Core Management
- **User & Role Management**: RBAC (Role-Based Access Control) with granular permissions.
- **Company & Branch**: Support for multi-company and multi-branch configurations.
- **Setup & Configuration**: Global settings for the ERP ecosystem.

### 👥 Human Resources (HR)
- **Employee Management**: Comprehensive records, career history, and onboarding.
- **Attendance & Leaves**: Track employee presence and manage leave requests.
- **Payroll**: Automated salary calculations, payslips, and GOSI contribution reports.
- **Recruitment**: Manage candidates, interviews, offers, and hiring processes.
- **Performance**: Track employee performance and generate detailed reports.

### 💰 Finance & Accounting
- **General Ledger**: Manage journal entries and chart of accounts.
- **Accounts Payable/Receivable**: Track payments to suppliers and from customers.
- **Reporting**: Generate Balance Sheets, Profit & Loss statements, and Trial Balances.
- **Asset Management**: Track company assets, depreciation, and maintenance.

### 📦 Inventory & Supply Chain
- **Stock Management**: Track inventory levels across multiple warehouses.
- **Procurement**: Manage purchase requests, orders, and goods receipts.
- **Sales**: Handle quotations, sales orders, invoices, and returns.
- **Pricing & Discounts**: Flexible pricing rules and promotion management.

### 🤝 CRM & Sales
- **Lead & Deal Tracking**: Manage the sales pipeline from lead to deal.
- **Customer Management**: Detailed customer profiles and interaction history.
- **Project & Task Management**: Organize work within the CRM module.

### 🚛 Fleet Management
- **Vehicle Tracking**: Manage vehicle registrations, fuel logs, and trips.
- **Maintenance**: Schedule and track vehicle repairs and servicing.
- **Driver Management**: Driver records and performance tracking.

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: Helmet, CORS, Bcryptjs
- **Email**: Resend, Nodemailer
- **Validation**: Zod
- **Logging**: Morgan

## 🚦 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB connection string

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd "erp system"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=WT_EXPIRES_IN_VALUE
   RESEND_API_KEY=YOUR_RESEND_API_KEY
   ```

### Running the Application

- **Development Mode**:
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

## 📁 Project Structure

- `src/app.js`: Application configuration and route registration.
- `src/index.js`: Entry point and server initialization.
- `src/modules/`: Feature-based modules (Auth, HR, Finance, etc.).
- `src/middlewares/`: Custom Express middlewares (Auth, Error handling, etc.).
- `src/config/`: Configuration files for DB, CORS, and environment.
- `src/common/`: Shared utilities and constants.

## 🔗 API Documentation

The API is structured around RESTful principles. Visit the root endpoint `/` to see a welcome message and a summary of available features.

---
Developed for **ERP System**.
