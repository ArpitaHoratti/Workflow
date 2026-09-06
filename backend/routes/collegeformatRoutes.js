const express = require("express");
const { generateCollegeformat } = require("../controllers/collegeformatContoller");

const router = express.Router();

router.post("/generate",
    generateCollegeformat
);

module.exports = router;

