import express from "express";
import mysql from "mysql";
import * as dotenv from "dotenv";

import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import helmet from "helmet";
import apirouter from "./routes/index";
import httpModule from "http";
import mySqlDbConnection from "./db/Database/sqlConnector";

dotenv.config();

const app = express();
const port = 5000;
app.use(helmet());
app.use(
  cors({
    origin: true,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Methods",
      "Access-Control-Request-Headers",
      "authToken",
      "refreshToken",
    ],
    credentials: true,
  })
);
app.options("*", cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", apirouter);
const db = mySqlDbConnection()
app.get("/", async (req, res) => {
  res.send("PropertyLoop");
});



app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
