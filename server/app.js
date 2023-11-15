import express from 'express'
import router from './routes/index.js'
import db from './database/index.js'
import { runMigrations } from './database/migration.js'
import { Server } from 'socket.io'
import cors from 'cors'
import socketListener from './socket-listener.js'

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

const app = express()
app.use('/api', router)
app.use(cors())

await connectDatabase()

const appServer = app.listen('3000', () => {
  console.log('Server started on port 3000 ...')
})

const io = new Server(appServer, { cors: true })

io.use((socket, next) => {
  console.log('Token: ', socket.handshake?.query?.token)
  next()
}).on('connection', (socketListener))
