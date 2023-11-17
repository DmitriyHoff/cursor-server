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

  getOnlineClients () {
    return socketList.sockets.map((item) => item.accessKey)
  }
}
const socketList = new SocketList()
export default socketList
