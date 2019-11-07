const express = require("express");
const router = express.Router();
const connectPostgres = require("../../config/db");
const db = connectPostgres();

// @route   GET users
// @desc    Get All Users
// @access  Public
const getUsers = async (req, res) => {
  const query = "SELECT * FROM users ORDER BY id ASC";
  try {
    const users = await db.query(query);
    res.status(200).json(users.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @route   GET users/:id
// @desc    Get User By Id
// @access  Public
const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);
  const query = "SELECT * FROM users WHERE id = $1";
  try {
    const user = await db.query(query, [id]);
    res.status(200).json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @route   POST users
// @desc    Create User
// @access  Public
const createUser = async (req, res) => {
  const { name, email } = req.body;
  const query = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id";
  try {
    const user = await db.query(query, [name, email]);
    res.status(201).send(`User added with ID: ${user.rows[0].id}`);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @route   PUT users/:id
// @desc    Update User
// @access  Public
const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const query =
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name";
  try {
    const user = await db.query(query, [name, email, id]);
    console.log(user);
    res
      .status(200)
      .send(
        `User modified with ID: ${user.rows[0].id} and name ${user.rows[0].name}`
      );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// @route   DELETE users/:id
// @desc    Delete User
// @access  Public
const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const query = "DELETE FROM users WHERE id = $1 RETURNING id, name, email";
  try {
    const user = await db.query(query, [id]);
    res
      .status(200)
      .send(
        `User deleted with ID: ${user.rows[0].id}, name: ${user.rows[0].name}, email: ${user.rows[0].email}`
      );
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
