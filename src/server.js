import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cors from 'cors'
import uploadRoutes from './routes/uploadRoutes.js'
import userRoutes from './routes/userRoutes.js'
import subjectRoutes from './routes/subjectRoutes.js'
import scheduleRoutes from './routes/scheduleRoutes.js'
import resultRoutes from './routes/resultRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import examRoutes from './routes/examRoutes.js'
import chapterRoutes from './routes/chapterRoutes.js'

dotenv.config()

connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send({
    code: 1,
    msg: 'success',
    message: 'Welcome to api Online Exam!',
    data: null,
  })
})

app.use('/api/subjects', subjectRoutes)
app.use('/api/schedules', scheduleRoutes)
app.use('/api/results', resultRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/exams', examRoutes)
app.use('/api/chapters', chapterRoutes)
app.use('/api/users', userRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
