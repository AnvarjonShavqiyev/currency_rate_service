import express from "express";
import ratesRouter from './routes/rates';
import dotenv from 'dotenv';
import { PORT } from "./constants";

const app = express();


dotenv.config()
app.use(express.json())

app.get("/", (_, res) => {
    res.send("This API for check exchange rates.");
});

app.use(ratesRouter);

app.listen(PORT, () => {
    console.log(`Port is running on http://localhost:${PORT}`)
})