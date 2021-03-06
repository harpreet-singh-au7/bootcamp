import { db } from "../..";
import DataBase from "../../db/Database/database";
import mySqlDbConnection from "../../db/Database/sqlConnector";
import { totalPropertyCount } from "../../db/query/getproperty";

// const db = mySqlDbConnection()
// export const totalPCount = async() =>await db.query(totalPropertyCount(),function(err,result){ 
//     if(err){
//      return err
//     }
//     return result
// })

export const countController = async() =>{

 await db.query(totalPropertyCount(),(err,result)=>{
        if(err){
            console.log(err)
        }
        return result
      })
    }