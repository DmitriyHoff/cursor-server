import { ActionType, Action, Client, Log } from '../database/models/index.js'

class DatabaseController {
  async addAction (type, params = null) {
    try {
      const user = await Action.create({ type, params })
      await user.reload()
      return user
    } catch (error) {
      console.log(error)
    }
    return null
  }

  async addClient (name) {
    try {
      const user = await Client.create({ name })
      await user.reload()
      return user
    } catch (error) {
      console.log(error)
    }
    return null
  }

  addLog () {}
}

export default new DatabaseController()
