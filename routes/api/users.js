const express = require("express");
const router = express.Router();
const connectPostgres = require("../../config/db");
const db = connectPostgres();

// @route   GET api/users
// @desc    Get All Users
// @access  Public
router.get("/", async (req, res) => {
  const query = "SELECT * FROM users ORDER BY id ASC";
  try {
    const users = await db.query(query);
    if (!users) return res.status(400).json({ msg: "No users found" });
    res.status(200).json(users.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/users/:id
// @desc    Get User By Id
// @access  Public
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const query = "SELECT * FROM users WHERE id = $1";
  try {
    const user = await db.query(query, [id]);
    if (!user) return res.status(400).json({ msg: "No user found" });
    res.status(200).json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/users
// @desc    Create User
// @access  Public
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  const query = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id";
  try {
    const user = await db.query(query, [name, email]);
    if (!user) return res.status(400).json({ msg: "Could not add user" });
    res.status(201).send(`User added with ID: ${user.rows[0].id}`);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/users/:id
// @desc    Update User
// @access  Public
router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const query =
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name";
  try {
    const user = await db.query(query, [name, email, id]);
    if (!user) return res.status(400).json({ msg: "Could not update user" });
    res
      .status(200)
      .send(
        `User modified with ID: ${user.rows[0].id} and name ${user.rows[0].name}`
      );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/users/:id
// @desc    Delete User
// @access  Public
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const query = "DELETE FROM users WHERE id = $1 RETURNING id, name, email";
  try {
    const user = await db.query(query, [id]);
    if (!user) return res.status(400).json({ msg: "Could not delete user" });
    res
      .status(200)
      .send(
        `User deleted with ID: ${user.rows[0].id}, name: ${user.rows[0].name}, email: ${user.rows[0].email}`
      );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
