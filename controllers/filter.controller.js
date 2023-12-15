const { Schoolmodel } = require("../models/school.model");

const filtercontroller = {
  search: async (req, res) => {
    try {
      let finalquery = [];
      let { query, lim } = req.query;

      if (!query) {
        return res.status(400).send({ message: "query not find" });
      }

      let type = parseInt(query);
      type
        ? finalquery.push({
            $search: {
              index: "establishmentName",
              autocomplete: {
                query: "10000",
                path: "urn",
              },
            },
          })
        : finalquery.push({
            $search: {
              index: "establishmentName",
              autocomplete: {
                query,
                path: "establishmentName",
                // fuzzy: { maxEdits: 1, prefixLength: 1, maxExpansions: 50 },
              },
            },
          });

      if (lim) {
        finalquery.push({ $limit: parseInt(lim) });
      }
      let searchdata = await Schoolmodel.aggregate(finalquery);
      res.send(searchdata);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  filter: async (req, res) => {
    try {
      let filter = [
        "Good",
        "Requires improvement",
        "Outstanding",
        "Inadequate",
      ];

      let finalquery = [];
      let { query, limit } = req.query;

      if (!query) {
        return res
          .status(400)
          .send({ message: "please send the data for filter" });
      }

      let queryarr = query.split(",");

      let filterdata = await Schoolmodel.aggregate([
        {
          $search: {
            index: "establishmentName",
            phrase: {
              query: queryarr,
              path: "OfstedRating",
            },
          },
        },
        { $limit: parseInt(limit) },
      ]);

      res.status(200).send(filterdata);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};

module.exports = {
  filtercontroller,
};
