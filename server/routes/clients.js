import databaseController from '../controllers/db.controller.js'
import socketList from '../socket-list.js'

export default async (request, response) => {
  try {
    let clients
    const { online } = request.query

    if (online) {
      const uuids = socketList.getOnlineClients()
      switch (online) {
        case 'true' : {
          clients = await databaseController.getClientsByUUID(...uuids)
          break
        }
        case 'false': {
          clients = await databaseController.getClientsExcludeUUID(...uuids)
          break
        }
        default: {
          response.status(400).json({ error: 'Invalid parameter value' })
        }
      }
    } else clients = await databaseController.getClients()

    response.status(200).json(clients)
  } catch (e) {
    console.log(e)
    response.status(500).json({ error: 'Internal server error' })
  }
}
