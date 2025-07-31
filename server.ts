import express from "express";
import { startRateFetchLoop } from "./services/fetchRates";
import ratesRouter from './routes/rates';
import dotenv from 'dotenv';

const app = express();
const PORT = 3000;


dotenv.config()
app.use(express.json())

app.get("/", (_, res) => {
    res.send("This API for check exchange rates.");
});

app.use(ratesRouter);
startRateFetchLoop();

app.listen(PORT, () => {
    console.log(`Port is running on http://localhost:${PORT}`)
})