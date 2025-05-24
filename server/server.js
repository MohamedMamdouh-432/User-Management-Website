const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
require("dotenv").config();
const Env = require("./env");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(`${Env.MONGO_BASE_URL}/${Env.DB_NAME}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find().select("-__v");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(Env.PORT, () => {
  console.log(`Server is running on port ${Env.PORT}`);
});
  