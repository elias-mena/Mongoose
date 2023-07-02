import express from 'express';
import cors from 'cors';
import './db';

const app: express.Application = express();

app.use(cors());
app.use(express.json());

export default app;
