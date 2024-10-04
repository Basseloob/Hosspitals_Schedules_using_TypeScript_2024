import mongoose from "mongoose";

const habib_Hospitals_Schema = new mongoose.Schema({
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

const habib_Model = mongoose.model(
  // "habib_Doctors_Schema",
  "habib_Hospitals_Schema",
  habib_Hospitals_Schema
);

// module.exports = habib_Model;
export default habib_Model;
