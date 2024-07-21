import express from 'express'
import router from './routes/index.js'
import db from './database/index.js'
import { runMigrations } from './database/migration.js'
import { Server } from 'socket.io'
import cors from 'cors'
import socketListener from './socket-listener.js'
import socketAuth from './socket-auth.js'
import dotenv from 'dotenv'

async function connectDatabase () {
  try {
    await db.createDatabase()
    await db.openConnection()
    console.log('Database connection has been established successfully.')
    await runMigrations()
    // await closeConnection();
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit(1)
  }
}
dotenv.config()

const app = express()
app.use('/api', router)
app.use(cors())

await connectDatabase()

// запускаем сервер
const port = process.env.NODE_DOCKER_PORT || 3000
const httpServer = app.listen(port, () => {
  console.log(`Server started on port ${port} ...`)
})

// создаём Socket-сервер, используем CORS
const io = new Server(httpServer, { cors: true })

// используем авторизацию, задаём CORS-origin 'allow all'
io.use(socketAuth, { cors: { origin: '*:*' } })

// добавляем обработчик соединения
io.on('connection', socketListener)
