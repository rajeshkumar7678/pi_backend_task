const jwt = require("jsonwebtoken");
require("dotenv").config();
const rolecheck = (role) => {
  return async (req, res, next) => {
    try {
      let token = req.headers.token;

      if (!token) {
        return res.status(400).send({ message: "please login" });
      }

      let verifytoken = jwt.verify(token, process.env.jwtsecret);

      if (!verifytoken) {
        return res.status(400).send({ message: "something went wrong" });
      }
      if (!role.includes(verifytoken.role)) {
        return res
          .status(400)
          .send({ message: "not authorised for this route" });
      }
      next();
    } catch (error) {
      res.send(error);
    }
  };
};

module.exports = {
  rolecheck,
};
