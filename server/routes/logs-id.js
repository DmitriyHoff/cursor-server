import databaseController from '../controllers/db.controller.js'

export default async (request, response) => {
  try {
    const { id } = request.params

    // Проверяем `id` на корректность
    if (isNaN(parseInt(id))) {
      response.status(400).json({ error: 'Invalid client id value' })
      return
    }

    // проверяем существование клиента в БД
    if (!await databaseController.isClientCreated(id)) {
      response.status(400).json({ error: 'Client not created' })
      return
    }

    // получаем логи с БД
    const logs = await databaseController.getUserLogs(id)
    response.status(200).json(logs)
  } catch (e) {
    console.log(e)
    response.status(500).json({ error: 'Internal server error' })
  }
}
