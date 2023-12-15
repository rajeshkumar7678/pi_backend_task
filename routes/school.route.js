const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { schoolcontroller } = require("../controllers/school.controller");
const { rolecheck } = require("../middleware/role.check");
const { filtercontroller } = require("../controllers/filter.controller");

const schoolroute = express.Router();

schoolroute.get(
  "/:urn",
  rolecheck(["admin", "user"]),
  schoolcontroller.getschooldatabyurn
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

schoolroute.get("/search/school", filtercontroller.search);

schoolroute.get("/filter/ofstad", filtercontroller.filter);

module.exports = {
  schoolroute,
};
