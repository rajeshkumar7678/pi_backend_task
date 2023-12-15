const { Usermodel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userregister = async (req, res) => {
  try {
    if (!req.body && !req.body.email) {
      return res.status(400).send({ message: "provide email for register" });
    }

    const { name, email, password, role } = req.body;

    const user = await Usermodel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .send({ message: "user already present please login" });
    }

    let bcryptpass = bcrypt.hashSync(password, 7);
    let newuser = new Usermodel({ email, password: bcryptpass, name, role });
    await newuser.save();

    res
      .status(200)
      .send({ message: "user registeration successfull please login now" });
  } catch (error) {
    console.log("error", error);
  }
};

const userlogin = async (req, res) => {
  try {
    if (!req.body && !req.body.email && !req.body.password) {
      return res
        .status(400)
        .send({ msg: "provide email amd password for login" });
    }

    let { email, password } = req.body;

    let user = await Usermodel.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "please register first !!!" });
    }

    let compass = bcrypt.compareSync(password, user.password);

    if (!compass) {
      return res.status(400).send({ message: "password incorrect !!!!" });
    }

    let token = jwt.sign(
      { userid: user._id, role: user.role },
      process.env.jwtsecret,
      { expiresIn: "2hr" }
    );

    res
      .status(200)
      .send({ message: "Login successfull", token: token, user: user });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  userregister,
  userlogin,
};
