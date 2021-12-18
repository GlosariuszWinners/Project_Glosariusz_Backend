import dotenv from 'dotenv'
import express from 'express'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import config from './config/config'
import dbConfig from './config/database'
import passport from './config/passport'
import { catchErrors, notFound } from './middlewares/errors'
import auth from './routes/auth'
import words from './routes/words'

dotenv.config({ path: '.env' })

passport()

mongoose.connect(dbConfig.mongoUrl, dbConfig.settings)

mongoose.connection.on('connected', () => {
    console.log('MongoDB connection open')
})

mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`)
    process.exit()
})

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later',
})
app.use(limiter)

// routes config
app.use('/api/words', words())
app.use('/api/auth', auth())

// errors handling
app.use(notFound)
app.use(catchErrors)

app.listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`)
})
