import { SocketController } from './controllers/socket.controller.js'

export default async (socket) => {
  const socketController = new SocketController()
  socketController.useSocket(socket)

  // выполняем авторизацию пользователя
  const token = await socketController.clientLogin()

  console.log('\x1b[32mClient `%s` connected \x1b[0m', token.name)

  socket.on('move', (...args) => socketController.onMove(socket, ...args))

  /**
   * Здесь, возможно, очередной "костыль"
   * socket в socketController именно в `diconnect` почему-то undefined...
   * Поэтому я его явно передаю
   */
  socket.on('disconnect', () => socketController.onDisconnect(socket))
}
