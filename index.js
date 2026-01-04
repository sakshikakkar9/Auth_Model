import express from "express"
import dbConnect from "./config/db.js"
import globalRoutes from "./routes.js"
import dotenv from "dotenv"
const app = express()
app.use(express.json())
dotenv.config({path:"./.env"})
await dbConnect()
app.get("/health",
    (req,res)=>{
        res.status(200).json({
            "status":"run successfully"
    })
    }
)

app.use("/api",globalRoutes)
export default app