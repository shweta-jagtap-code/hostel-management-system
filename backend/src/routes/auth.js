const express = require("express");
const router = express.Router();
const db = require("../db");

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT role FROM users WHERE username=? AND password=?";
  db.query(sql, [username, password], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(401).send("Invalid login");

    res.json({
      username,
      role: result[0].role
    });
  });
});

module.exports = router;
