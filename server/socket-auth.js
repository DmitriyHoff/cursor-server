import databaseController from './controllers/db.controller.js'

export default async (socket, next) => {
  const { accessKey } = socket.handshake?.query

  // если передан accessKey - проверяем пользователя
  if (accessKey) {
    if (!await databaseController.isAccessKey(accessKey)) {
      const err = new Error('not authorized')
      err.data = { content: 'Invalid accessKey' }
      console.log('\x1b[31mConnection refused:\x1b[0m Invalid accessKey')
      next(err)
      return
    }
  }
  console.log('\x1b[36mAuthentication successful\x1b[0m')
  next()
}
