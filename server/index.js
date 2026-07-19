import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import ConnectMongoDB from './src/config/DB.js'

import dns from 'dns'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { errorHandler } from './src/utils/CustomError.js'
import authRoutes from './src/routes/authRoutes.js'
import sessionRoutes from './src/routes/sessionRoutes.js'
import questionRoutes from './src/routes/questionRoutes.js'
import { generateConceptExplanation, generateInterviewQuestions } from './src/controllers/aiController.js'
import { authUser } from './src/middleware/authUser.js'


const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.use(cors({
origin : 'http://localhost:5173' ,
credentials : true

}))



app.use('/api/auth', authRoutes)
app.use('/api/session' , sessionRoutes)
app.use('/api/question' , questionRoutes)

app.use('/api/ai/generate-questions', authUser,  generateInterviewQuestions)
app.use('/api/ai/generate-explanations', authUser, generateConceptExplanation   )



dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])


app.use(errorHandler)

const PORT = process.env.PORT

// cloudinaryConnect()
ConnectMongoDB()
.then(()=>{
    console.log('Prep Partner DB connected');

app.listen(PORT,()=>{
    console.log('Prep Partner is connected on',PORT)
    
})    
}).catch((err)=>{
    console.log('Failed to connect to DB and server',err)
    
})
































