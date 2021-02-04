import 'reflect-metadata';
import 'dotenv/config';

import express from 'express'

import './typeorm/index'

import routes from './routes'

const app = express();

app.use(express.json());
app.use(routes)

app.listen(process.env.SERVER_PORT, () => {
  console.log('app running on port ' + process.env.SERVER_PORT)
})