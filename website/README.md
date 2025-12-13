# HackatonFinal2.1 – User CRUD API

Bu loyiha **Node.js + Express + MongoDB** bilan yozilgan, to‘liq **User CRUD** API.  
Loyihada foydalanuvchilarni yaratish, o‘chirish, yangilash va olish mumkin.  

---

## 🛠 Texnologiyalar

- Node.js (v24+)
- Express.js
- MongoDB (Mongoose)
- bcryptjs (password hash)
- Nodemon (development)
- dotenv (environment variables)
- CORS

---

## 📁 Fayl tuzilishi

server/
├─ src/
│ ├─ config/
│ │ └─ db.js # MongoDB bilan ulanish
│ ├─ controllers/
│ │ └─ user.controller.js # User CRUD logikasi
│ ├─ models/
│ │ └─ user.model.js # User model
│ ├─ routes/
│ │ └─ user.routes.js # User API endpointlari
│ └─ app.js # Express app
├─ server.js # Server entry point
├─ package.json
└─ .env

markdown
Copy code

---

## ⚡ Xususiyatlar (Features)

- User yaratish (`POST /api/users`)
- Barcha userlarni olish (`GET /api/users`)
- Bitta userni olish (`GET /api/users/:id`)
- Userni yangilash (`PUT /api/users/:id`)
- Userni o‘chirish (`DELETE /api/users/:id`)
- Password **hashlangan** (`bcryptjs`)
- `createdAt` va `updatedAt` avtomatik saqlanadi
- Role support (`user` / `admin`)

---

## 🔧 O‘rnatish (Installation)

1. Repository ni klonlash:

```bash
git clone <repository-url>
cd HackatonFinal2.1/server
Paketlarni o‘rnatish:

bash
Copy code
npm install
.env faylini yaratish va sozlash:

ini
Copy code
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
Serverni ishga tushirish (development):

bash
Copy code
npm run dev
Server ishlayotganini terminalda ko‘rasiz:

arduino
Copy code
✅ Server ishlayapti: http://localhost:5000
✅ MongoDB ulandi
🧪 API Endpoints
Method	URL	Tavsif
GET	/api/users	Barcha userlar
GET	/api/users/:id	Bitta user
POST	/api/users	Yangi user yaratish
PUT	/api/users/:id	User ma’lumotlarini yangilash
DELETE	/api/users/:id	Userni o‘chirish

Example: POST /api/users
json
Copy code
{
  "name": "Ali",
  "surname": "Valiyev",
  "email": "ali@gmail.com",
  "password": "123456",
  "role": "user"
}
Javobda password hashlangan bo‘ladi.

createdAt va updatedAt avtomatik qo‘shiladi.

🔑 Key Points
Password xavfsizligi: Password ochiq saqlanmaydi, hash bilan saqlanadi.

Timestamps: User yaratishda sana avtomatik qo‘shiladi.

Role: Foydalanuvchi admin yoki oddiy user bo‘lishi mumkin.

📌 Keyingi qadamlar
JWT token bilan login va autentifikatsiya

Admin panelga role-based access

Frontend bilan ulash (React, Vue yoki boshqa)