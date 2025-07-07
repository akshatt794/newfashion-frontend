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

// Upload banner (image or video)
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { title, link, subheadline, poster } = req.body;
    const file = req.file;
    let bannerData = { title, link, subheadline };

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

// Get all banners
router.get("/", async (req, res) => {
  try {
    const banners = await Banner.find({});
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete banner
router.delete("/:id", async (req, res) => {
  try {
    await Banner.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
