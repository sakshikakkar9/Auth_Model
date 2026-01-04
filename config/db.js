import { MongoClient } from "mongodb";
import dotenv from "dotenv"
dotenv.config({path:"../.env"})

export const client = new MongoClient(process.env.MONGO);
// db.connect().then(()=>{
//     console.log("Conneted to db")
// })

export default async function dbConnect(){
    try {
        await client.connect()
        console.log("Connected Successfully")
    } catch (error) {
        console.error(error)
    }
}