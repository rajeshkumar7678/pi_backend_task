const express = require("express");
const { userregister, userlogin } = require("../controllers/user.controllers");

const userroute = express.Router();

userroute.post("/register", userregister);

userroute.post("/login", userlogin);

module.exports = {
  userroute,
};
