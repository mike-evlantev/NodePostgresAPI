const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const majorVersion = process.env.npm_package_version.split(".")[0];

const users = require("./routes/api/users");

app.use(express.json({ extended: false }));

// Define Routes
app.use(`/api/v${majorVersion}/users`, users);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
