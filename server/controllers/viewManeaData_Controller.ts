import habib_Model from "../models/habib_Model";
import maena_Model from "../models/manea_Model";

export const view_Manea_Hospitals = async (req: any, res: any, next: any) => {
  await habib_Model
    .find()
    .then((habibHospitals) => {
      res.json(habibHospitals);
    })
    .catch((err) => {
      next(err);
    });
};
