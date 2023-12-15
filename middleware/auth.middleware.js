const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    let token = req.headers.token;

    if (!token) {
      return res.status(400).send({ message: "please login first" });
    }

    let verifytoken = jwt.verify(token, process.env.jwtsecret);

    if (!verifytoken) {
      return res.status(400).send({ message: "something went wrong" });
    }

    req.userid = verifytoken.userid;
    req.role = verifytoken.role;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

module.exports = {
  auth,
};
