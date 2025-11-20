# Express.js Product API

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm
- MongoDB (local or cloud instance)

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd express-js-server-side-framework-fin001
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file based on `.env.example` and set your environment variables.
4. Start the server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

## 🛠️ Environment Variables
See `.env.example` for required variables.

## 📚 API Endpoints

### Authentication
All `/api/products` routes require an `Authorization` header:
```
Authorization: Bearer secrettoken
```

### Product Routes

#### List Products (with filtering & pagination)
- **GET** `/api/products?category=electronics&page=1&limit=10`
- **Query Params:**
  - `category` (optional): Filter by category
  - `page` (optional): Page number (default: 1)
  - `limit` (optional): Items per page (default: 10)
- **Response:**
```json
{
  "products": [ ... ],
  "total": 20,
  "page": 1,
  "pages": 2
}
```

#### Get Product by ID
- **GET** `/api/products/:id`
- **Response:**
```json
{
  "_id": "...",
  "name": "Laptop",
  ...
}
```

#### Create Product
- **POST** `/api/products`
- **Body:**
```json
{
  "name": "Laptop",
  "description": "High-performance laptop",
  "price": 1200,
  "category": "electronics",
  "inStock": true
}
```
- **Response:**
```json
{
  "_id": "...",
  "name": "Laptop",
  ...
}
```

#### Update Product
- **PUT** `/api/products/:id`
- **Body:** (same as create)
- **Response:**
```json
{
  "_id": "...",
  "name": "Updated Laptop",
  ...
}
```

#### Delete Product
- **DELETE** `/api/products/:id`
- **Response:**
```json
{
  "message": "Deleted Product"
}
```

#### Search Products by Name
- **GET** `/api/products/search?name=laptop`
- **Response:**
```json
[
  { "_id": "...", "name": "Laptop", ... }
]
```

#### Product Statistics
- **GET** `/api/products/stats`
- **Response:**
```json
[
  { "category": "electronics", "count": 10 },
  { "category": "kitchen", "count": 5 }
]
```

## 🧪 Example Requests

### Using curl
```sh
curl -H "Authorization: Bearer secrettoken" http://localhost:3000/api/products
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer secrettoken" -d '{"name":"Laptop","description":"High-performance laptop","price":1200,"category":"electronics","inStock":true}' http://localhost:3000/api/products
```

### Using Postman
- Set the `Authorization` header as above for all requests.
- Use the provided endpoints and example bodies.

## 📝 Notes
- All endpoints return JSON.
- Proper error messages and status codes are provided for invalid requests.# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install dependencies:
   ```
   npm install
   ```
4. Run the server:
   ```
   npm start
   ```

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

The API will have the following endpoints:

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 