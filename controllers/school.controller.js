const { Schoolmodel } = require("../models/school.model");

const schoolcontroller = {
  getschooldatabyurn: async (req, res) => {
    try {
      let { urn } = req.params;
      let schooldata = await Schoolmodel.findOne({ urn: urn });

      if (!schooldata) {
        return res.status(400).send({ message: "school not found " });
      }
      res.status(200).send({ schooldata: schooldata });
    } catch (error) {
      console.log(error);
      res.status(400).send("something went wrong");
    }
  },

  addschooldata: async (req, res) => {
    try {
      let schooldata = req.body;
      if (!schooldata && !schooldata.urn) {
        return res.status(400).send({ message: "please provide school data" });
      }

      let checkschool = await Schoolmodel.findOne({ urn: schooldata.urn });

      if (checkschool) {
        return res.status(400).send({ message: "already exist" });
      }

      let newschool = new Schoolmodel(schooldata);
      await newschool.save();
      res.status(200).send({ message: "school added successfull" });
    } catch (error) {
      console.log(error);
      res.status(400).send("something went wrong");
    }
  },

  updateschool: async (req, res) => {
    try {
      let { urn } = req.params;
      let payload = req.body;

      if (!payload) {
        return res
          .status(400)
          .send({ message: "please provide data to update" });
      }

      if (!urn) {
        return res
          .status(400)
          .send({ message: "please provide data to update" });
      }

      let checkschool = await Schoolmodel.findOne({ urn });

      if (!checkschool) {
        return res.status(400).send({ message: "school not exist in db " });
      }

      let updateschool = await Schoolmodel.findByIdAndUpdate(
        checkschool._id,
        payload
      );

      res.status(200).send({ message: "school data updated " });
    } catch (error) {
      console.log(error);
      res.status(400).send("something went wrong");
    }
  },

  deleteschool: async (req, res) => {
    try {
      let { urn } = req.params;

      if (!urn) {
        return res
          .status(400)
          .send({ message: "please provide data to update" });
      }

      let checkschool = await Schoolmodel.findOne({ urn });

      if (!checkschool) {
        return res.status(400).send({ message: "school not exist in db " });
      }

      let updateschool = await Schoolmodel.findByIdAndDelete(checkschool._id);

      res.status(200).send({ message: "school data deleted " });
    } catch (error) {
      console.log(error);
      res.status(400).send("something went wrong");
    }
  },
};

module.exports = {
  schoolcontroller,
};
