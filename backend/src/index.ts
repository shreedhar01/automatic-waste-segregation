import express, { type Request, type Response } from "express"
import bucketRouter from "./api-v1/routes/bucket.route.js"

const app = express();
app.use(express.json())

app.get('/', (_:Request, res:Response) => {
    res.json({message:"Hello world"})
})
app.use("/api/v1/bucket",bucketRouter)

app.listen(process.env.PORT || 8002,() => {
    console.log("Hello world :: ", process.env.PORT);
})