import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import joyasRoute from './routes/joyasRoute.js'
import { errorHandler } from './src/middlewares/errorHandler.js'
import { logger } from './src/middlewares/logger.js'

const app = express()
const PORT = process.env.PORT ?? 5000

//Middleware
app.use(express.json())
app.use(cors())
app.use(logger)
app.use(joyasRoute)

// Middleware de errores global
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server conecting on: http://localhost:${PORT}`)
})