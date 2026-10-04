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

Laravel schema:

```graphql
products: [Product!]! @all
```

---

# 2. Get Single Product

Used for the Product Details/Edit page.

GraphQL Query:

```graphql
query GetProduct($id: ID!) {
    product(id: $id) {
        id
        name
        price
        description
    }
}
```

Variables:

```json
{
    "id": 1
}
```

Laravel schema:

```graphql
product(id: ID!): Product @find
```

---

# 3. Create Product

GraphQL Mutation:

```graphql
mutation CreateProduct(
    $name: String!
    $price: Float!
    $description: String
) {
    createProduct(
        name: $name
        price: $price
        description: $description
    ) {
        id
        name
        price
        description
    }
}
```

Variables:

```json
{
    "name": "Chocolate Cake",
    "price": 500,
    "description": "Fresh chocolate cake"
}
```

Laravel schema:

```graphql
createProduct(
    name: String!
    price: Float!
    description: String
): Product @create
```

---

# 4. Update Product

GraphQL Mutation:

```graphql
mutation UpdateProduct(
    $id: ID!
    $name: String!
    $price: Float!
    $description: String
) {
    updateProduct(
        id: $id
        name: $name
        price: $price
        description: $description
    ) {
        id
        name
        price
        description
    }
}
```

Variables:

```json
{
    "id": 1,
    "name": "Premium Chocolate Cake",
    "price": 650,
    "description": "Premium chocolate cake"
}
```

Laravel schema:

```graphql
updateProduct(
    id: ID!
    name: String!
    price: Float!
    description: String
): Product @update
```

---

# 🛠️ Backend Setup

Go to the Laravel backend:

```bash
cd backend
```

Install PHP dependencies:

```bash
composer install
```

Copy the environment file:

```bash
cp .env.example .env
```

On Windows, you can also manually copy:

```text
.env.example
```

to:

```text
.env
```

Generate Laravel application key:

```bash
php artisan key:generate
```

---

## Database Configuration

Create a MySQL database:

```text
graphql_demo
```

Update the Laravel `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=graphql_demo
DB_USERNAME=root
DB_PASSWORD=
```

Run migrations:

```bash
php artisan migrate
```

If you have a Product seeder:

```bash
php artisan db:seed
```

---

## Install Lighthouse

If Lighthouse is not already installed:

```bash
composer require nuwave/lighthouse
```

Publish the configuration:

```bash
php artisan vendor:publish \
--provider="Nuwave\Lighthouse\LighthouseServiceProvider"
```

---

## Start Laravel

```bash
php artisan serve
```

Laravel will normally run at:

```text
http://localhost:8000
```

GraphQL endpoint:

```text
http://localhost:8000/graphql
```

---

# ⚛️ Frontend Setup

Go to the React project:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

If required:

```bash
npm install axios react-router-dom
```

---

## Environment Configuration

Create:

```text
frontend/.env
```

Add:

```env
VITE_GRAPHQL_URL=http://localhost:8000/graphql
```

The React Axios client uses:

```javascript
const graphqlClient = axios.create({
    baseURL: import.meta.env.VITE_GRAPHQL_URL,
});
```

---

## Start React

```bash
npm run dev
```

React will normally run at:

```text
http://localhost:5173
```

---

# 📄 Application Pages

## Product List

```text
/products
```

Displays:

* ID
* Product Name
* Price
* Description
* View/Edit button

---

## Create Product

```text
/products/create
```

Allows the user to:

* Enter product name
* Enter price
* Enter description
* Create the product

---

## Single Product / Edit

```text
/products/:id
```

Example:

```text
/products/1
```

The page:

1. Gets the product using GraphQL.
2. Displays the existing information.
3. Allows the user to edit the information.
4. Sends an update mutation.

---

# 🔐 CORS

If React is running on:

```text
http://localhost:5173
```

and Laravel is running on:

```text
http://localhost:8000
```

Laravel must allow the React origin.

Example CORS configuration:

```php
'paths' => [
    'api/*',
    'sanctum/csrf-cookie',
    'graphql',
],

'allowed_methods' => ['*'],

'allowed_origins' => [
    'http://localhost:5173',
],

'allowed_origins_patterns' => [],

'allowed_headers' => ['*'],

'supports_credentials' => false,
```

After changing configuration:

```bash
php artisan optimize:clear
```

---

# 🧪 Testing GraphQL

You can test the API using a GraphQL client such as GraphiQL or another API testing tool.

GraphQL endpoint:

```text
POST http://localhost:8000/graphql
```

Example query:

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

---

# 📊 CRUD Flow

```text
                Product CRUD
                     |
       +-------------+-------------+
       |             |             |
       ▼             ▼             ▼
     LIST          CREATE        UPDATE
       |             |             |
       ▼             ▼             ▼
   products      createProduct  updateProduct
       |
       ▼
     SINGLE
       |
       ▼
     product
```

---

# 🎯 What This Project Demonstrates

This project demonstrates:

* React component development
* React state management
* React Router
* Controlled forms
* Axios API integration
* GraphQL queries
* GraphQL mutations
* GraphQL variables
* Laravel API development
* Laravel Lighthouse
* Eloquent ORM
* MySQL integration
* CORS handling
* Full-stack application architecture

---

# 💼 Explanation

> I developed a Product CRUD application using React.js and Laravel GraphQL. The React frontend communicates with Laravel through a single `/graphql` endpoint using Axios. I implemented GraphQL queries for product listing and retrieving a single product, and mutations for creating and updating products. Laravel Lighthouse maps the GraphQL schema to Eloquent models, which interact with the MySQL database.

---

# 🚀 Future Improvements

The project can be extended with:

* Delete Product
* Product Search
* Pagination
* Authentication
* Role-based authorization
* Form validation
* GraphQL custom resolvers
* Laravel Service Layer
* Product Categories
* Product Image Upload
* Order Management
* Redis caching
* Unit Testing
* Feature Testing
* Docker
* CI/CD

---

# 👨‍💻 Author

**Deepak Patidar**

Full Stack / Senior PHP Developer

Skills:

```text
PHP
Laravel
CodeIgniter
React.js
Node.js
JavaScript
MySQL
REST API
GraphQL
```

---

## ⭐ Project Goal

This project is created for learning and demonstrating a **React.js + Laravel + GraphQL full-stack application architecture**.
