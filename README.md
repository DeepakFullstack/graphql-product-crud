# React + Laravel GraphQL Product CRUD

A simple full-stack Product CRUD application built with **React.js**, **Laravel**, **GraphQL**, **Lighthouse**, and **MySQL**.

This project demonstrates how a React frontend communicates with a Laravel backend through a single GraphQL endpoint.

---

## 🚀 Tech Stack

### Frontend

* React.js
* React Router
* Axios
* JavaScript
* Vite

### Backend

* Laravel
* PHP
* GraphQL
* Lighthouse
* Eloquent ORM

### Database

* MySQL

---

## 📌 Features

* Product Listing
* Get Single Product
* Create Product
* Update Product
* GraphQL Queries
* GraphQL Mutations
* React Forms
* React Router
* Laravel Eloquent
* MySQL Database
* CORS configuration
* GraphQL variables

---

## 📂 Project Structure

```text
graphql-product-crud/
│
├── backend/
│   ├── app/
│   │   └── Models/
│   │       └── Product.php
│   │
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   │
│   ├── graphql/
│   │   └── schema.graphql
│   │
│   ├── routes/
│   ├── .env.example
│   ├── composer.json
│   └── artisan
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── graphql.js
│   │   │
│   │   ├── pages/
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductCreate.jsx
│   │   │   └── ProductEdit.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

# 🔄 Application Architecture

```text
                   React.js
                      |
                      |
                   Axios
                      |
                      |
              POST /graphql
                      |
                      ▼
             Laravel Lighthouse
                      |
                GraphQL Schema
                      |
                      ▼
                Eloquent ORM
                      |
                      ▼
                   MySQL
```

The frontend uses a **single GraphQL endpoint**:

```text
http://localhost:8000/graphql
```

Different operations are sent through this endpoint.

---

# 🔍 GraphQL Operations

## 1. Get All Products

GraphQL Query:

```graphql
query {
    products {
        id
        name
        price
        description
    }
}
```
