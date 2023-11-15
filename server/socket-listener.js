import { SocketController } from './controllers/socket.controller.js'

export default async (socket, next) => {
  const socketController = new SocketController(socket)
  console.log('Client connected...')

  socket.on('login', socketController.login)
  socket.on('move', socketController.move)
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
}
