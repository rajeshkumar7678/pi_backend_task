const express = require("express");
const cors = require("cors");
const { connection } = require("./utils/db");
const { userroute } = require("./routes/user.route");
const { schoolroute } = require("./routes/school.route");
require("dotenv").config();

const port = process.env.port || 7678;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("express app");
});

app.use("/user", userroute);

app.use("/school", schoolroute);

app.listen(port, async () => {
  try {
    await connection;
    console.log("db is connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`server is running on ${port}`);
});
