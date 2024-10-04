import mongoose from "mongoose";

const manea_Hospitals_Schema = new mongoose.Schema({
  Img: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  Speciality: {
    type: String,
    required: true,
  },
  Hospital: {
    type: String,
    required: true,
  },
  DateObj: [
    {
      Date: {
        type: String,
        required: true,
      },
      Times: [String],
    },
  ],
});

const manea_Model = mongoose.model(
  // "habib_Doctors_Schema",
  "manea_Hospitals_Schema",
  manea_Hospitals_Schema
);

// module.exports = habib_Model;
export default manea_Model;
