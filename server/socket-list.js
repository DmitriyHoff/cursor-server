import colors from './color-set.js'
class SocketList {
  constructor () {
    this.sockets = []
  }

  add ({ socketId, accessKey, id, name, point }) {
    const index = Math.floor(Math.random() * colors.length)
    this.sockets.push({ socketId, accessKey, id, name, point, color: colors[index] })
  }

  delete (socketId) {
    const socketRecord = this.getItem(socketId)

    this.sockets.splice(this.sockets.indexOf(socketRecord), 1)
  }

  getItem (socketId) {
    const item = this.sockets.find(item => item.socketId === socketId)
    return item
  }

  getClientInfoBySocketId (sId) {
    const item = this.sockets.find(item => item.socketId === sId)
    const { accessKey, socketId, ...newItem } = item
    return newItem
  }

  getOnlineAccessKeys () {
    return socketList.sockets.map((item) => item.accessKey)
  }

  getOnlineClients () {
    return socketList.sockets.map((item) => {
      const { accessKey, socketId, ...newItem } = item
      return newItem
    })
  }

  getOnlineClientById (id) {
    return socketList.sockets.map((item) => {
      const { accessKey, socketId, ...newItem } = item
      return newItem
    })
  }

  getClientPoint (id) {
    const client = socketList.sockets.find((item) => item.clientId === id)
    return client.point
  }

  getClientColor (id) {
    const client = socketList.sockets.find((item) => item.clientId === id)
    return client.color
  }

  getClientData (id) {

  }
}
const socketList = new SocketList()
export default socketList
