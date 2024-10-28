// import habib_Doctors_Model from "../models/habib_Doctors_Model";
import manea_Model from "../models/manea_Model";

export const view_Manea_Hospitals = async (req: any, res: any, next: any) => {
  await manea_Model
    .find()
    .then((habibHospitals) => {
      res.json(habibHospitals);
    })
    .catch((err) => {
      next(err);
    });
};
