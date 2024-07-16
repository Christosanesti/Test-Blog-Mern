import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'


dotenv.config();

const app = express();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running at 3000 Hello')
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);