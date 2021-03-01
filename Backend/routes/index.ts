
import { Router } from "express"
import { photourl } from "../controller/getProperty/getProperty"
import { pool } from "../db/Database/sqlConnector"

const router = Router()

router.get('/',(req,res) =>{
    res.send('api welcome')
})


router.get('/imgUrl',async(req,res) =>{
    const resp = await photourl
    console.log(resp)
    try{
    res.send(resp)
    }
    catch(err){
        res.status(404).send(err)
        console.log(`errorrrrr ` + err)
    }
})
export default router