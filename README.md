# 🛒 Express.js REST API — Products CRUD

Backend REST API sederhana untuk manajemen produk, dibangun menggunakan **Express.js**, **Knex.js**, dan **MySQL**.

---

## 📁 Struktur Project

```
mini-project-express/
├── server.js                        # Entry point
├── app.js                           # Express setup & middleware global
├── .env.example
├── .gitignore
├── package.json
└── src/
    ├── config/
    │   └── app.js                   # Konfigurasi env (port, db, jwt)
    ├── db/
    │   └── index.js                 # Knex instance
    ├── middleware/
    │   ├── errorHandler.js          # Centralized error handler
    │   └── notFound.js              # 404 handler
    ├── routes/
    │   ├── index.js                 # Aggregator semua route
    │   └── productRoutes.js
    ├── controllers/
    │   └── productController.js
    ├── services/
    │   └── productService.js        # Business logic & query Knex
    └── utils/
        ├── AppError.js              # Custom error class
        └── response.js              # Helper response standar
```

---

## ⚙️ Instalasi & Setup

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/hosealeonardo18/mini-project-express.git
cd mini-project-express
npm install
```

### 2. Konfigurasi Environment

```bash
cp .env.example .env
```

Edit file `.env` sesuai konfigurasi lokal kamu:

```env
APP_PORT=3000
APP_ENV=development

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=mini-project-ci

```

### 3. Jalankan Migration

```bash
npm run migrate
```

### 4. Jalankan Server

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Server berjalan di: `http://localhost:3000`

---

## 🔌 API Endpoints — Products

**Base URL:** `http://localhost:3000/api/v1`

---

### 📋 Get All Products

```
GET /api/v1/products
```

Mengambil seluruh data produk.

**Response:**
```json
{
  "success": true,
  "message": "Data produk berhasil diambil.",
  "data": [
    {
      "id": 1,
      "name": "Laptop ASUS",
      "price": 12000000,
      "stock": 10,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z",
    }
  ]
}
```

---

### 🔍 Get All Products (Search by Name)

```
GET /api/v1/products?search={keyword}
```

Mencari produk berdasarkan nama (case-insensitive, partial match).

**Query Parameter:**

| Parameter | Tipe   | Wajib | Keterangan                  |
|-----------|--------|-------|-----------------------------|
| `search`  | string | ❌    | Kata kunci nama produk      |

**Contoh Request:**

```
GET /api/v1/products?search=laptop
```

**Response:**
```json
{
  "success": true,
  "message": "Data produk berhasil diambil.",
  "data": [
    {
      "id": 1,
      "name": "Laptop ASUS",
      "price": 12000000,
      "stock": 10,
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z",
    }
  ]
}
```

---

### 🔎 Get Product by ID

```
GET /api/v1/products/:id
```

Mengambil detail satu produk berdasarkan ID.

**URL Parameter:**

| Parameter | Tipe    | Wajib | Keterangan   |
|-----------|---------|-------|--------------|
| `id`      | integer | ✅    | ID produk    |

**Contoh Request:**

```
GET /api/v1/products/1
```

**Response:**
```json
{
  "success": true,
  "message": "Data produk berhasil diambil.",
  "data": {
    "id": 1,
    "name": "Laptop ASUS",
    "price": 12000000,
    "stock": 10,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z",
  }
}
```

---

### ➕ Create Product

```
POST /api/v1/products
```

Menambahkan produk baru.

**Request Body (JSON):**

| Field         | Tipe    | Wajib | Keterangan            |
|---------------|---------|-------|-----------------------|
| `name`        | string  | ✅    | Nama produk           |
| `price`       | number  | ✅    | Harga produk          |
| `stock`       | integer | ✅    | Jumlah stok           |

**Contoh Request:**

```json
{
  "name": "Laptop ASUS",
  "price": 12000000,
  "stock": 10
}
```

**Response `201 Created`:**
```json
{
  "success": true,
  "message": "Produk berhasil ditambahkan.",
  "data": {
    "id": 1,
    "name": "Laptop ASUS",
    "price": 12000000,
    "stock": 10,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z",
  }
}
```

---

### ✏️ Update Product

```
PUT /api/v1/products/:id
```

Mengubah data produk berdasarkan ID.

**URL Parameter:**

| Parameter | Tipe    | Wajib | Keterangan   |
|-----------|---------|-------|--------------|
| `id`      | integer | ✅    | ID produk    |

**Request Body (JSON):** *(kirim field yang ingin diubah saja)*

```json
{
  "name": "Laptop ASUS ROG",
  "price": 15000000,
  "stock": 5
}
```

**Response:**
```json
{
  "success": true,
  "message": "Produk berhasil diupdate.",
  "data": {
    "id": 1,
    "name": "Laptop ASUS ROG",
    "price": 15000000,
    "stock": 5,
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z",
  }
}
```

---

### 🗑️ Delete Product

```
DELETE /api/v1/products/:id
```

Menghapus produk berdasarkan ID.

**URL Parameter:**

| Parameter | Tipe    | Wajib | Keterangan   |
|-----------|---------|-------|--------------|
| `id`      | integer | ✅    | ID produk    |

**Contoh Request:**

```
DELETE /api/v1/products/1
```

**Response:**
```json
{
  "success": true,
  "message": "Produk berhasil dihapus.",
  "data": null
}
```

---

## ❌ Error Response

Semua error dikembalikan dalam format standar berikut:

```json
{
  "success": false,
  "message": "Pesan error di sini."
}
```

**HTTP Status Code yang digunakan:**

| Status Code | Keterangan                              |
|-------------|-----------------------------------------|
| `200`       | OK — request berhasil                   |
| `201`       | Created — data berhasil dibuat          |
| `400`       | Bad Request — request tidak valid       |
| `401`       | Unauthorized — token tidak valid/expired|
| `403`       | Forbidden — tidak punya akses           |
| `404`       | Not Found — data / route tidak ditemukan|
| `409`       | Conflict — data duplikat                |
| `500`       | Internal Server Error                   |

---

## 🧪 Contoh Testing dengan cURL

```bash
# Get all products
curl http://localhost:3000/api/v1/products

# Search by name
curl "http://localhost:3000/api/v1/products?search=laptop"

# Get by ID
curl http://localhost:3000/api/v1/products/1

# Create product
curl -X POST http://localhost:3000/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Laptop ASUS","price":12000000,"stock":10}'

# Update product
curl -X PUT http://localhost:3000/api/v1/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":15000000}'

# Delete product
curl -X DELETE http://localhost:3000/api/v1/products/1
```

---

## 🛠️ Tech Stack

| Library     | Versi   | Fungsi                        |
|-------------|---------|-------------------------------|
| express     | ^4.19   | Web framework                 |
| knex        | ^3.1    | Query builder / migration     |
| mysql2      | ^3.9    | MySQL driver                  |
| dotenv      | ^16.4   | Environment variable          |
| nodemon     | ^3.1    | Auto-reload (dev only)        |

---

## 📜 NPM Scripts

| Command              | Keterangan                        |
|----------------------|-----------------------------------|
| `npm run dev`        | Jalankan server dengan nodemon    |
| `npm start`          | Jalankan server (production)      |
| `npm run migrate`    | Jalankan semua migration          |
| `npm run migrate:rollback` | Rollback migration terakhir |
| `npm run seed`       | Jalankan seed data                |