const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/agenda", require("./routes/agendaRoutes"));
app.use("/api/collegeformat", require("./routes/collegeformatRoutes"));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});