import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/index.js'

dotenv.config({
  path: './.env'
});

const app = express();
const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening at port: ${PORT}`);
    })
  })
  .catch((error) => {
    console.log(error);
  })