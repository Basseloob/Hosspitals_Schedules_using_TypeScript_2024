import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// Routes
import habib_Routes from "./routes/habibRoutes";
import manea_Routes from "./routes/maneaRoutes";

dotenv.config({ path: "./config/config.env" });

const app = express();

const port = process.env.PORT || 3000;
const DB_NAME = process.env.DATABASE_NAME;
const DB: any = process.env.DATABASE?.replace(
  "<DATABASE_PASSWORD>",
  process.env.DATABASE_PASSWORD as string
)?.replace("<DATABASE_NAME>", process.env.DATABASE_NAME as string);

mongoose.connect(DB).then(() => {
  console.log(`mongoDB is connected to ${DB_NAME}.`);
});

app.get("/", (req, res) => {
  console.log("CLicked");
  res.send("Hi thereeeee");
});

// app.get("/habib-Hospital", async (req, res) => {
//   try {
//     const mongoDB_data = await habib_Model.find({
//       //   Speciality: "FAMILY MEDICINE",
//     });

//     if (mongoDB_data.length === 0) {
//       return res.status(404).json({ error: "No data found!!!" });
//     }

//     console.log("MongoDB Data:", mongoDB_data);

//     res.json(mongoDB_data);
//   } catch (error) {
//     console.error("Error in /habibSchedule FM route:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.use("/api/v1/habib", habib_Routes);
app.use("/api/v1/manea", manea_Routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
