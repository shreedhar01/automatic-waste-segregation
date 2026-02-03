import express, { type Request, type Response } from "express"

const app = express();

app.get('/', (_:Request, res:Response) => {
    res.json({message:"Hello world"})
})

app.listen(8000,() => {
    console.log("Hello world");
})