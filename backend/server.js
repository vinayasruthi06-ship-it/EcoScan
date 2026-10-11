
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
    } else {
      callback(new Error("Please upload an image file."));
    }
  }
});

app.get("/", (req, res) => {
  res.json({
    message: "EcoScan backend is running!"
  });
});

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: "Please upload an image."
    });
  }

  res.json({
    message: "Image uploaded successfully!",
    fileName: req.file.originalname,
    fileSize: req.file.size,
    status: "Waiting for waste classification model"
  });
});

app.post("/api/disposal", (req, res) => {
  const wasteType = String(req.body.wasteType || "")
    .trim()
    .toLowerCase();

  const disposalAdvice = {
    plastic: [
      "Empty the bottle or container.",
      "Rinse it if needed.",
      "Check local recycling rules before placing it in the recycling bin."
    ],
    glass: [
      "Reuse the glass container if possible.",
      "Rinse it if needed.",
      "Use your local glass recycling collection point.",
      "Handle broken glass carefully."
    ],
    paper: [
      "Keep paper clean and dry.",
      "Separate paper from food waste.",
      "Place recyclable paper in the appropriate recycling bin."
    ],
    organic: [
      "Separate food scraps from other waste.",
      "Compost them if composting is available.",
      "Follow your local organic waste collection rules."
    ],
    metal: [
      "Empty the metal container.",
      "Rinse it if needed.",
      "Place it in the appropriate metal recycling collection."
    ]
  };

  if (!disposalAdvice[wasteType]) {
    return res.status(400).json({
      error: "Unknown waste type. Use plastic, glass, paper, organic, or metal."
    });
  }

  res.json({
    wasteType: wasteType,
    disposalAdvice: disposalAdvice[wasteType]
  });
});

app.use((err, req, res, next) => {
  res.status(400).json({
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`EcoScan server running at http://localhost:${PORT}`);
});
