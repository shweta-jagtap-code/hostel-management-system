const express = require("express");
const router = express.Router();   // ✅ MISSING LINE (FIX)
const db = require("../db");
const bcrypt = require("bcryptjs");
const { sendWelcomeMail } = require("../utils/mailer");

/**
 * GET all staff users
 */
router.get("/", (req, res) => {
  const sql = `
    SELECT user_id, username, role, email, contact_no
    FROM users
    ORDER BY user_id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Fetch Staff Error:", err);
      return res.status(500).json({ message: err.message });
    }
    res.json(results);
  });
});

/**
 * ADD staff user
 */
router.post("/", async (req, res) => {
  try {
    const { username, role, email, contact_no } = req.body;

    if (!username || !role || !email || !contact_no) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔐 Generate random password
    const tempPassword = Math.random().toString(36).slice(-8);

    const sql = `
      INSERT INTO users (username, password, role, email, contact_no)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [username, tempPassword, role, email, contact_no],
      async (err) => {
        if (err) {
          console.error("Create Staff Error:", err);
          return res.status(500).json({ message: err.message });
        }

        // 📧 Send credentials email
        try {
          await sendWelcomeMail(email, username, tempPassword);
        } catch (mailErr) {
          console.error("Email Error:", mailErr.message);
        }

        res.json({ message: "Staff user created successfully" });
      }
    );
  } catch (error) {
    console.error("Unexpected Error:", error);
    res.status(500).json({ message: error.message });
  }
});

/**
 * DELETE staff user
 */
router.delete("/:id", (req, res) => {
  const userId = req.params.id;

  const sql = "DELETE FROM users WHERE user_id = ?";
  db.query(sql, [userId], (err) => {
    if (err) {
      console.error("Delete Staff Error:", err);
      return res.status(500).json({ message: err.message });
    }

    res.json({ message: "User deleted successfully" });
  });
});

module.exports = router;
