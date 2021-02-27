import express from "express";
import mysql from "mysql"
import * as dotenv from 'dotenv';
import mySqlDbConnection from "./db/sqlConnector";
dotenv.config()

const app = express();
const port = 5000;


const db = mySqlDbConnection();
console.log(db.query("Select * FROM porperties"))

app.get("/", (err: any,req, res:any ) => {
  if (err) {
    res.status(404).send("something went wrong");
  }

  res.send("Hello");
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
