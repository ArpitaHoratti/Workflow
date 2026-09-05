const express = require("express");
const { generateAgenda } = require("../controllers/agendaController");

const router = express.Router();

router.post("/generate",
    generateAgenda
);

module.exports = router;

