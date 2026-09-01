const express = require("express");
const { generateReport } = require("../controllers/reportController");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.post("/generate",
    upload.fields([
        { name: "photo1", maxCount: 1 },
        { name: "photo2", maxCount: 1 },
        { name: "photo3", maxCount: 1 },
        { name: "photo4", maxCount: 1 }
    ]),
    generateReport
);

module.exports = router;

