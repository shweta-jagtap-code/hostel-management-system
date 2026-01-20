const express = require("express");
const router = express.Router();
const db = require("../db");

// GET students
router.get("/", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// ADD student (Admin / Warden only)
router.post("/", (req, res) => {
  const { name, roll_no, room_no, role } = req.body;

  if (role !== "ADMIN" && role !== "WARDEN") {
    return res.status(403).send("Access Denied");
  }

  const sql = "INSERT INTO students(name, roll_no, room_no) VALUES (?,?,?)";
  db.query(sql, [name, roll_no, room_no], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Student Added");
  });
});

module.exports = router;
