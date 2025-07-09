// routes/banner.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Banner = require("../models/Banner");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// POST /api/banners - Upload a banner (image or video, with type)
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, link, subheadline, poster, type } = req.body; // <-- type is required
    if (!type || !["video", "carousel"].includes(type)) {
      return res.status(400).json({ message: "Banner 'type' must be 'video' or 'carousel'" });
    }

    const file = req.file;
    let bannerData = { title, link, subheadline, type };

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (file.mimetype.startsWith("image/")) {
      bannerData.image = "/uploads/" + file.filename;
    } else if (file.mimetype.startsWith("video/")) {
      bannerData.video = "/uploads/" + file.filename;
      if (poster) bannerData.poster = poster;
    } else {
      return res.status(400).json({ message: "Invalid file type" });
    }

    const banner = new Banner(bannerData);
    await banner.save();
    res.status(201).json(banner);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/banners?type=carousel (or type=video) - Get banners by type or all
router.get("/", async (req, res) => {
  try {
    const { type } = req.query;
    let query = {};
    if (type && ["video", "carousel"].includes(type)) {
      query.type = type;
    }
    const banners = await Banner.find(query);
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/banners/:id - Delete a banner
router.delete("/:id", async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
