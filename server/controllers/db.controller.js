import { ActionType, Action, Client, Log } from '../database/models/index.js'
import { Op } from 'sequelize'
class DatabaseController {
  /**
   * Добавить новое действие в БД
   * @param {String} type Тип
   * @param {JSON} params
   * @returns
   */
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

  /**
   * Добавить нового клиента в БД
   * @param {String} name имя клиента
   * @returns Новый клиент
   */
  async addClient (name) {
    const client = await Client.create({ name })
    await client.reload()
    return client
  }

  /**
   * Получить объект клиента с указанным `uuid`
   * @param {string} uuid уникальный ключ
   * @returns Вобращает объект `Client`
   */
  async getClientByUUID (uuid) {
    const client = await Client.findOne({
      where: { uuid }
    })
    return client
  }

  /**
   * Получить клиентов с `uuid` из списка
   * @param {string} uuid уникальный ключ
   * @returns Вобращает массив объектов `Client`
   */
  async getClientsByUUID (...uuids) {
    const clients = await Client.findAll({
      where: { uuid: [...uuids] },
      attributes: {
        exclude: ['uuid']
      },
      raw: true
    })
    return clients
  }

  /**
   * Получить всех клиентов кроме содежащих `uuid` из списка
   * @param {string} uuid уникальный ключ
   * @returns Вобращает массив объектов `Client`
   */
  async getClientsExcludeUUID (...uuids) {
    const client = await Client.findAll({
      where: { uuid: { [Op.notIn]: [...uuids] } },
      attributes: { exclude: ['uuid'] },
      raw: true
    })
    return client
  }

  /**
   * Получить список всех клиентов
   * @returns Возвращает массив объектов `Client`
   */
  async getClients () {
    const clients = await Client.findAll({
      attributes: {
        exclude: ['uuid']
      },
      raw: true
    })
    return clients
  }

  /**
   * Проверить `accessKey`
   * @param {String} accessKey уникальный ключ
   * @returns Возвращает `true` если пользователь найден
   */
  async isAccessKey (accessKey) {
    const count = await Client.count({ where: { uuid: accessKey } })
    return Boolean(count)
  }

  /**
   * Проверить существование клиента в БД
   * @param {*} id Идентификатор клиента
   * @returns Воращает `true`, если клиент создан
   */
  async isClientCreated (id) {
    const count = await Client.count({ where: { id } })
    return Boolean(count)
  }

  /**
   * Записать лог
   * @param {Number} clientId Идентификатор клиента
   * @param {String} actionName Название действия
   * @param {Object} params Дополнительные параметры
   * @returns Возвращает объект `Log`
   */
  async addLog (clientId, actionName, params = null) {
    const [actionType] = await ActionType.findOrCreate({ where: { type: actionName } })
    const action = await Action.create({ type_id: actionType.id, params: JSON.stringify(params) })
    const log = await Log.create({ client_id: clientId, action_id: action.id })
    return log
  }

  async getUserLogs (clientId) {
    const actions = await Action.findAll({
      attributes: {
        exclude: ['id', 'type_id'],
        include: [[Action.sequelize.literal('"ActionType"."type"'), 'type']]
      },

      include: [{
        model: Log,
        where: { client_id: clientId },
        attributes: []
      },
      {
        model: ActionType,
        attributes: []
      }]
    })
    return actions
  }
}

export default new DatabaseController()
