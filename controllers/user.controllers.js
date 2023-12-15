const { usermodel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userregister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await usermodel.findOne({ email });

    if (user) {
      return res.status(400).send({ msg: "user already present please login" });
    }

    let bcryptpass = bcrypt.hashSync(password, 7);
    let newuser = new usermodel({ email, password: bcryptpass, name, role });
    await newuser.save();

    res
      .status(200)
      .send({ msg: "user registeration successfull please login now" });
  } catch (error) {
    console.log("error", error);
  }
};

const userlogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await usermodel.findOne({ email });

    if (!user) {
      return res.status(400).send({ msg: "please register first !!!" });
    }

    let compass = bcrypt.compareSync(password, user.password);

    if (!compass) {
      return res.status(400).send({ msg: "password incorrect !!!!" });
    }

    let token = jwt.sign(
      { userid: user._id, role: user.role },
      process.env.jwtsecret,
      { expiresIn: "2hr" }
    );

    res
      .status(200)
      .send({ msg: "Login successfull", token: token, user: user });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  userregister,
  userlogin,
};
