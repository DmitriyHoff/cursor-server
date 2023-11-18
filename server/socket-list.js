import colors from './color-set.js'

/** Список с информацией о подключенных клиентах */
class SocketList {
  constructor () {
    this.sockets = []
  }

  /**
   * Добавить идентификатор сокета и связанную информацию о клиенте в список
   * @param {*} param0 Объект с `socketId` и связанной информацией клиента
   */
  add ({ socketId, accessKey, id, name, point }) {
    // определить случайный цвет для нового клиента
    const index = Math.floor(Math.random() * colors.length)

    this.sockets.push({ socketId, accessKey, id, name, point, color: colors[index] })
  }

  /**
   * Удалить идентификатор сокета из списка
   * @param {String} socketId идентификатор сокета
   */
  delete (socketId) {
    const socketRecord = this.getItem(socketId)
    this.sockets.splice(this.sockets.indexOf(socketRecord), 1)
  }

  /**
   * Получить запись из списка с указанным `socketId`
   * @param {String} socketId идентификатор сокета
   * @returns Возвращает объект с `socketId` и связанной информацией клиента
   */
  getItem (socketId) {
    const item = this.sockets.find(item => item.socketId === socketId)
    return item
  }

  /**
   * Получить только информацию о клиенте, исключая `accessKey` и `socketId`
   * @param {String} id идентификатор сокета
   * @returns Возвращает объект
   */
  getClientInfoBySocketId (id) {
    const item = this.sockets.find(item => item.socketId === id)
    const { accessKey, socketId, ...newItem } = item
    return newItem
  }

  /**
   * Получить информацию о всех клиентах, исключая `accessKey` и `socketId`
   * @returns Массив
   */
  getOnlineClients () {
    return socketList.sockets.map((item) => this.getClientInfoBySocketId(item.socketId))
  }

  /**
   * Получить список подключенных `accessKey`
   * @returns Возвращает массив `accessKey`
   */
  getAccessKeys () {
    return socketList.sockets.map((item) => item.accessKey)
  }
}

const socketList = new SocketList()
export default socketList
