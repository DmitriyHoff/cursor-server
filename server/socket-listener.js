import { SocketController } from './controllers/socket.controller.js'

export default async (socket) => {
  const socketController = new SocketController()
  socketController.useSocket(socket)

  console.log('\x1b[32m%s\x1b[0m', 'Client connected...')

  // сохраняем в списке socket.id и accessKey
  // const { uuid: accessKey, name: clientName, id: clientId } =
  await socketController.clientLogin()

  socket.on('move', (...args) => socketController.onMove(socket, ...args))

  /**
   * Здесь, возможно, очередной "костыль"
   * socket в socketController именно в `diconnect` почему-то undefined...
   * Поэтому я его явно передаю
   */
  socket.on('disconnect', () => socketController.onDisconnect(socket))
}
