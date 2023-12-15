const { schoolmodel } = require("../models/school.model");

const filtercontroller = {
  search: async (req, res) => {
    try {
      let finalquery = [];
      let { query } = req.query;

      if (!query) {
        return res.status(400).send({ message: "query not find" });
      }

      //   let type = +query;
      //   console.log(typeof type);
      //   if (typeof type == Number) {
      //     finalquery.push({
      //       $search: {
      //         index: "urn",
      //         text: {
      //           query: query,
      //           path: "urn",
      //         },
      //       },
      //     });
      //   } else {
      //     finalquery.push({
      //       $search: {
      //         index: "establishmentName",
      //         text: {
      //           query: query,
      //           path: "establishmentName",
      //         },
      //       },
      //     });
      //   }
      //console.log(finalquery);

      let searchdata = await schoolmodel.aggregate([
        {
          $search: {
            index: "establishmentName",
            text: {
              query: query,
              path: "establishmentName",
            },
          },
        },
      ]);
      res.send(searchdata);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};

module.exports = {
  filtercontroller,
};
