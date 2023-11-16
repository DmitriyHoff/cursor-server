import databaseController from './controllers/db.controller.js'

export default async (socket, next) => {
  const { accessKey } = socket.handshake?.query
  console.log('\x1b[36mAccessKey: %s\x1b[0m', accessKey)

  // если передан accessKey - проверяем пользователя
  if (accessKey) {
    if (!await databaseController.isAccessKey(accessKey)) {
      const err = new Error('not authorized')
      err.data = { content: 'Invalid accessKey' }
      console.log('\x1b[31mConnection refused: \x1b[0mInvalid `accessKey`')
      next(err)
      return
    }
  }
  next()
}
