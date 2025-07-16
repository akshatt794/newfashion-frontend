
const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const multer = require("multer");
require("dotenv").config();

const Product = require("./models/Product");
const Banner  = require("./models/Banner");
const Order   = require("./models/Order");
const User    = require("./models/User");

const productRoutes = require('./routes/products');
const authRoutes      = require("./routes/auth");
const adminProdRoutes = require("./routes/products");

const app = express();
const path = require("path");

// ─── MIDDLEWARE ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    "https://newfashion-frontend.netlify.app",
    "http://localhost:5173" // for local dev, keep if needed
  ],
  credentials: true // if you use cookies/auth
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── MULTER CONFIG ─────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ─── DATABASE ──────────────────────────────────────────────────────────────────

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

// ─── ROUTES ────────────────────────────────────────────────────────────────────

// Health check
app.get("/", (req, res) => res.send("Backend API is running!"));

// PRODUCTS
app.use('/api/products', productRoutes);

// BANNERS (supporting both image and video)
app.get("/api/banners", async (req, res) => {
  const banners = await Banner.find();
  res.json(banners);
});
app.post("/api/banners", upload.single("file"), async (req, res) => {
  try {
    const { title, link } = req.body;
    const file = req.file;
    let bannerData = { title, link };

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (file.mimetype.startsWith("image/")) {
      bannerData.image = `/uploads/${file.filename}`;
    } else if (file.mimetype.startsWith("video/")) {
      bannerData.video = `/uploads/${file.filename}`;
      // You can add poster logic if you want (see earlier answers)
    } else {
      return res.status(400).json({ message: "Invalid file type" });
    }

    const banner = new Banner(bannerData);
    await banner.save();
    res.json(banner);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});
app.delete("/api/banners/:id", async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ORDERS
app.get("/api/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// USERS
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// AUTH + ADMIN ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminProdRoutes);

// ─── NO SECOND app.listen() ────────────────────────────────────────────────────

