import habib_Doctors_Model from "../models/habib_Doctors_Model";

export const view_Habib_Hospitals = async (req: any, res: any, next: any) => {
  await habib_Doctors_Model
    .find()
    .then((habibHospitals) => {
      res.json(habibHospitals);
    })
    .catch((err) => {
      next(err);
    });
};
