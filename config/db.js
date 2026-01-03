import { MongoClient } from "mongodb";
import dotenv from "dotenv"
dotenv.config()

const db = new MongoClient(process.env.MONGO);
// db.connect().then(()=>{
//     console.log("Conneted to db")
// })

export default async function dbConnect(){
    try {
        await db.connect()
        console.log("Connected Successfully")
    } catch (error) {
        console.error(error)
    }
}