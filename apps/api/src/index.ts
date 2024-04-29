import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './api/routers';
import bodyParser from 'body-parser';

import { PORT } from './config';
const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(bodyParser.json());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    error: true,
    message: err,
    data: null,
  });
});

app.listen(PORT, () => {
  console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
});
