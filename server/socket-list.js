class SocketList {
  constructor () {
    this.sockets = []
  }

  add ({ socketId, accessKey }, setOnlineCallback = null) {
    this.sockets.push({ socketId, accessKey })
    // set online
    if (setOnlineCallback) {
      setOnlineCallback(accessKey, true)
    }
  }

  delete (socketId) {
    const socketRecord = this.getAccessKeyBySocketId(socketId)

    this.sockets.splice(this.sockets.indexOf(socketRecord), 1)
  }

  getAccessKeyBySocketId (socketId) {
    return this.sockets.find(item => (item.socketId === socketId))
  }
}
const socketList = new SocketList()
export default socketList
