const express = require("express");
const router = express.Router();
const connectPostgres = require("../../config/db");
const db = connectPostgres();
const Status = require("../../models/enums/Status");

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

// @route   GET api/users/active
// @desc    Get All Active Users
// @access  Public
router.get("/active", async (req, res) => {
  const query = "SELECT * FROM users WHERE status = $1 ORDER BY id ASC";
  try {
    const users = await db.query(query, [Status.ACTIVE]);
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
    if (user.rows[0].status !== Status.ACTIVE)
      return res.status(400).json({ msg: "No active user found" });
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
  const query =
    "INSERT INTO users (name, email, status) VALUES ($1, $2, $3) RETURNING id, status";
  try {
    const user = await db.query(query, [name, email, Status.ACTIVE]);
    if (!user) return res.status(400).json({ msg: "Could not add user" });
    res
      .status(201)
      .send(
        `User added with ID: ${user.rows[0].id}, and status ${user.rows[0].status}`
      );
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

// @route   PUT api/users/activate/:id
// @desc    Activate User
// @access  Public
router.put("/activate/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const query =
    "UPDATE users SET status = $1 WHERE id = $2 RETURNING id, name, status";
  try {
    const user = await db.query(query, [status, id]);
    if (!user) return res.status(400).json({ msg: "Could not update user" });
    res
      .status(200)
      .send(
        `User activated with ID: ${user.rows[0].id}, name ${user.rows[0].name}, and status ${user.rows[0].status}`
      );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/users/deactivate/:id
// @desc    Deactivate User
// @access  Public
router.put("/deactivate/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const query =
    "UPDATE users SET status = $1 WHERE id = $2 RETURNING id, name, status";
  try {
    const user = await db.query(query, [status, id]);
    if (!user) return res.status(400).json({ msg: "Could not update user" });
    res
      .status(200)
      .send(
        `User deactivated with ID: ${user.rows[0].id}, name ${user.rows[0].name}, and status ${user.rows[0].status}`
      );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/users/delete/:id
// @desc    Delete User
// @access  Public
router.put("/delete/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const query =
    "UPDATE users SET status = $1 WHERE id = $2 RETURNING id, name, status";
  try {
    const user = await db.query(query, [status, id]);
    if (!user) return res.status(400).json({ msg: "Could not delete user" });
    res
      .status(200)
      .send(
        `User deleted with ID: ${user.rows[0].id}, name: ${user.rows[0].name}, and status ${user.rows[0].status}`
      );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
