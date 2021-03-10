
import { promises } from "dns"
import { Router } from "express"
import { db } from ".."
import { countController } from "../controller/getProperty/getProperty"

import mySqlDbConnection, { pool } from "../db/Database/sqlConnector"
import { bedroomCount, gettingProperty, gettingPropertyName, imgUrl, totalPropertyCount } from "../db/query/getproperty"

const router = Router()
// const db = mySqlDbConnection()

router.get('/',(req,res) =>{
    res.send('api welcome')
})

router.get('/propertyname' ,async(req,res) =>{
  await db.query(gettingPropertyName(), function (err, result) {
        if (err) {
            console.log(err)
        }
        result = result.map(function (a: { property_name: any} ) { return a.property_name })
        res.status(200).json(result)
    })
  
})

router.get('/rowcount',async (req,res) =>{
    await db.query(totalPropertyCount(),function(err,result){
        if(err){
            console.log(err)
        }
        
        
        res.json(Object.values(result[0]))
      })
  
})

router.get("/bedcount", async (req,res) =>{
    await db.query(bedroomCount(),function(err,result){
        if(err){
            console.log(err)
        }
        console.log(result + " bedddddddddddd")
        res.send(result)
    })
})

router.get('/imgUrl',async(req,res) =>{
 await db.query(imgUrl(), function (err, result) {
        if (err) {
            console.log(err)
            res.status(404).send(err + "erorr handle")
        }
        const arr: any[] = []
        for (var i = 0; i < result.length; i++) {
            arr.push(result[i].url)
            //Do something
        }
        // console.log(arr)
        res.status(200).json(arr)
    })
})

router.get('/getallprop', async(req,res) =>{
    db.query(gettingProperty(),function(err,result){
        if(err){
            console.log(err)
            res.status(404).send(err + "erorr handle")
        }
        res.status(200).send(result)
     })
})

router.get('/getpropname', async(req,res) =>{
    db.query(gettingPropertyName(),function(err,result){
        if(err){
            console.log(err)
            res.status(404).send(err + "erorr handle")
        }
        JSON.stringify(result)
        // let obj = result 
        //  let array = Object.keys(obj).map((key) => [Number(key), obj[key]])
        res.status(200).send(result)
     })
})


export default router