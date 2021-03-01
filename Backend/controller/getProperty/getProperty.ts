import DataBase from "../../db/Database/database";
import { totalPropertyCount } from "../../db/query/getproperty";


const db = new DataBase()
export const photourl = db.execute(totalPropertyCount())