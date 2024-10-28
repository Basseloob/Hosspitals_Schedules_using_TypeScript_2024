import mongoose from "mongoose";
import get_Habib_Data from "../puppeteer/habib_Puppeteer";
import habib_Model from "../models/habib_Doctors_Model";

const DB: string =
  "mongodb://basseloob:Basilpsp9111@ac-7hgzxvl-shard-00-00.nnbcxyh.mongodb.net:27017,ac-7hgzxvl-shard-00-01.nnbcxyh.mongodb.net:27017,ac-7hgzxvl-shard-00-02.nnbcxyh.mongodb.net:27017/?replicaSet=atlas-x2jk5t-shard-0&ssl=true&authSource=admin";

mongoose
  .connect(DB, {
    dbName: "Habib_Doctors",
  })
  .then((connectionObj) => {
    // console.log(connectionObj.connections);
    console.log(
      "DB connections successfully connected : " //, connectionObj.connections
    );
  })
  .catch((err) => console.log("Server Connection Error ", err));

// Khobar : \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
const habib_KBR_Im_Url =
  "https://hmgeservices.com/login?ProjectID=60&ClinicID=1&StrDate=%27%27&lang=en";
const habib_KBR_Family_Url =
  "https://hmgeservices.com/login?ProjectID=60&ClinicID=26&StrDate=%27%27&lang=en";
const habib_KBR_Cardio_Url =
  "https://hmgeservices.com/login?ProjectID=60&ClinicID=21&StrDate=%27%27&lang=en";
const habib_KBR_Endo_Url =
  "https://hmgeservices.com/login?ProjectID=60&ClinicID=14&StrDate=%27%27&lang=en";
const habib_KBR_Nephro_Url =
  'https://hmgeservices.com/login?ProjectID=60&ClinicID=30&StrDate=%27%27&lang=en"';
const habib_KBR_Neurology_Url =
  'https://hmgeservices.com/login?ProjectID=60&ClinicID=30&StrDate=%27%27&lang=en"';

const importData = async () => {
  try {
    // await get_Habib_Data(habib_KBR_Family_Url);
    // await get_Habib_Data(habib_KBR_Nephro_Url);
    // await get_Habib_Data(habib_KBR_Im_Url);
    // await get_Habib_Data(habib_KBR_Cardio_Url);
    // await get_Habib_Data(habib_KBR_Endo_Url);
    await get_Habib_Data(habib_KBR_Neurology_Url);
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

const deleteData = async () => {
  try {
    await habib_Model.deleteMany();
    console.log("Data successfully deleted from database !");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);

//////////////////////////////////////
//////////////////////////////////////
// To  make this file works -->
// 1) cd server
// 2) ➜  server npx ts-node ./data/import_HabibData.ts --import
//////////////////////////////////////
//////////////////////////////////////
