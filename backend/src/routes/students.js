const express = require("express");
const router = express.Router();
const db = require("../db");


// ✅ GET ALL STUDENTS
// URL: GET /api/students
router.get("/", (req, res) => {
  const sql = "SELECT * FROM students ORDER BY student_id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fetch Students Error:", err);
      return res.status(500).json({ message: err.message });
    }

    res.json(results);
  });
});


// ✅ ADD NEW STUDENT
// URL: POST /api/students
router.post("/", (req, res) => {
  const {
    name,
    contact_no,
    room_no,
    course,
    hostel_block
  } = req.body;

  // Validation
  if (!name || !contact_no || !room_no || !course || !hostel_block) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const sql = `
    INSERT INTO students
    (name, contact_no, room_no, course, hostel_block)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    contact_no,
    room_no,
    course,
    hostel_block
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Insert Student Error:", err);
      return res.status(500).json({ message: err.message });
    }

    res.json({
      message: "Student added successfully ✅",
      studentId: result.insertId
    });
  });
});

module.exports = router;
