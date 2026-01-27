require("dotenv").config();   // 👈 ADD THIS FIRST

const express = require("express");
const studentsRoute = require("./routes/students");
const staffRoute = require("./routes/staff");
const authRoutes = require("./routes/auth");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());

// Routes
app.use("/api/students", studentsRoute);
app.use("/api/auth", authRoutes);
// Staff API

app.use("/api/staff", staffRoute);

// Port from env
const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
