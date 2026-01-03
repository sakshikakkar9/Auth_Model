import express from "express"
import dbConnect from "./config/db.js"
import globalRoutes from "./routes.js"
const app = express()
app.use(express.json())
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