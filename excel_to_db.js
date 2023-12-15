var xlsx = require("xlsx");

require("dotenv").config();
const mongoose = require("mongoose");
const { schoolmodel } = require("./models/school.model");

mongoose.connect(process.env.mongourl);

const schoolexcelsheet = xlsx.readFile("schools.xlsx");

const schoolsheet = schoolexcelsheet.Sheets[schoolexcelsheet.SheetNames[1]];

const schooldata = xlsx.utils.sheet_to_json(schoolsheet);

console.log(schooldata);

let addtodb = async (schooldata) => {
  try {
    await schoolmodel.insertMany(schooldata);
    console.log("data added to db");
  } catch (error) {
    console.log(error);
  }
};
addtodb(schooldata);
