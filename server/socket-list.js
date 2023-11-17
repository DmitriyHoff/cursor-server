class SocketList {
  constructor () {
    this.sockets = []
  }

  add ({ socketId, accessKey, clientId, clientName, point }) {
    this.sockets.push({ socketId, accessKey, clientId, clientName, point })
  }

  delete (socketId) {
    const socketRecord = this.getClientInfoBySocketId(socketId)

    this.sockets.splice(this.sockets.indexOf(socketRecord), 1)
  }

  getClientInfoBySocketId (socketId) {
    return this.sockets.find(item => (item.socketId === socketId))
  }

  getOnlineAccessKeys () {
    return socketList.sockets.map((item) => item.accessKey)
  }

  getOnlineClients () {
    return socketList.sockets.map((item) => item.accessKey)
  }

  getClientPoint (id) {
    const client = socketList.sockets.find((item) => item.clientId === id)
    return client.point
  }
}
const socketList = new SocketList()
export default socketList
