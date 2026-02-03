import express, { type Request, type Response } from "express"

const app = express();

app.get('/', (_:Request, res:Response) => {
    res.json({message:"Hello world"})
})

app.listen(process.env.PORT || 8002,() => {
    console.log("Hello world :: ", process.env.PORT);
})