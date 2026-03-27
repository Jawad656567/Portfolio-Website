// =============================
// backend/server.js
// =============================


// Express ko import kar rahe hain
// Express ek Node.js framework hai jo server aur APIs banana asan karta hai
const express = require("express");


// Mongoose ko import kar rahe hain
// Mongoose MongoDB database ke sath kaam karne ke liye use hota hai
// Iski madad se hum data ko save, read, update aur delete kar sakte hain
const mongoose = require("mongoose");


// CORS ko import kar rahe hain
// CORS ka matlab hai Cross Origin Resource Sharing
// Iska kaam hai React frontend ko allow karna ke wo backend API ko access kar sake
// Agar CORS na ho to browser request block kar deta hai
const cors = require("cors");


// dotenv ko import kar rahe hain
// dotenv .env file me rakhe secret variables ko load karta hai
// jaise database password, API keys waghera
require("dotenv").config();



// Express application create kar rahe hain
// yeh hamara main backend app hai jisme routes aur middleware add honge
const app = express();



// =============================
// MIDDLEWARE SECTION
// =============================


// cors middleware enable kar rahe hain
// iska matlab hai frontend (React) ko backend se data lene ki permission mil gayi
app.use(cors());


// express.json middleware enable kar rahe hain
// iska kaam hai incoming JSON data ko read karna
// example frontend se agar data aaye:
// { "title": "Learn MERN" }
// to server isko samajh sakega
app.use(express.json());



// =============================
// MONGODB CONNECTION
// =============================


// mongoose.connect MongoDB database se connection banata hai
// process.env.MONGO_URI .env file se database connection string leta hai

mongoose.connect(process.env.MONGO_URI)

  // agar database successfully connect ho jaye
  .then(() => console.log("MongoDB Connected"))

  // agar koi error aaye (wrong password ya network issue)
  .catch(err => console.log("MongoDB Connection Error:", err));



// =============================
// TEST ROUTE
// =============================


// yeh ek simple GET API route hai
// jab koi browser me yeh URL open karega:
// http://localhost:5000

// to server response me "API Running" bhejega

// req = request object (frontend ki request)
// res = response object (server ka reply)

app.get("/", (req, res) => {
  res.send("API Running");
});



// =============================
// SERVER START
// =============================


// PORT variable define kar rahe hain
// agar .env file me PORT likha ho to wo use hoga
// warna default 5000 use hoga

const PORT = process.env.PORT || 5000;


// server start kar rahe hain
// app.listen server ko start karta hai
// aur specific port par run karta hai

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

// =============================
// AUTH ROUTES
// =============================

// auth routes import kar rahe hain
const authRoutes = require("./routes/auth");

// auth routes ko activate kar rahe hain
// ab jo bhi request /api/auth par ayegi
// wo routes/auth.js me handle hogi
app.use("/api/auth", authRoutes);


// About routes
const aboutRoutes = require("./routes/about");
app.use("/api/about", aboutRoutes);

//profile routes
// Profile APIs
const profileRoutes = require("./routes/profile");
app.use("/api/profile", profileRoutes);

// ProfileInfo routes (NEW)
const ProfileInfoRoutes = require("./routes/ProfileInfo");
app.use("/api/ProfileInfo", ProfileInfoRoutes);




