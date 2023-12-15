const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { schoolcontroller } = require("../controllers/school.controller");
const { rolecheck } = require("../middleware/role.check");
const { filtercontroller } = require("../controllers/filter.controller");

const schoolroute = express.Router();

schoolroute.get("/", schoolcontroller.getschooldata);

schoolroute.get(
  "/:urn",
  rolecheck(["admin", "user"]),
  schoolcontroller.getschooldatabyid
);

schoolroute.post(
  "/",
  auth,
  rolecheck(["admin"]),
  schoolcontroller.addschooldata
);

schoolroute.patch(
  "/:urn",
  auth,
  rolecheck(["admin"]),
  schoolcontroller.updateschool
);

schoolroute.delete(
  "/:urn",
  auth,
  rolecheck(["admin"]),
  schoolcontroller.deleteschool
);

schoolroute.get("/search/name", filtercontroller.search);
module.exports = {
  schoolroute,
};
