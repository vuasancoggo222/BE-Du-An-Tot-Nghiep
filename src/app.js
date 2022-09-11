import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
import authRouter from './routes/authenticate'
const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use('/api',authRouter)
app.listen(process.env.PORT,()=>{
    console.log(`Server is running`);
})


mongoose.connect(process.env.MONGODB_URL).then(() => console.log("Connect DB Successfully"))
.catch(error => console.log(error))
