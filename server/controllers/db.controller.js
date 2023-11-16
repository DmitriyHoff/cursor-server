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
    const client = await Client.findOne({ where: { uuid } })
    return client
  }

  /**
   * Получить клиентов с `uuid` из списка
   * @param {string} uuid уникальный ключ
   * @returns Вобращает массив объектов `Client`
   */
  async getClientsByUUID (...uuids) {
    const client = await Client.findAll({ where: { uuid: [...uuids] } })
    return client
  }

  /**
   * Получить всех клиентов кроме содежащих `uuid` из списка
   * @param {string} uuid уникальный ключ
   * @returns Вобращает массив объектов `Client`
   */
  async getClientsExcludeUUID (...uuids) {
    const client = await Client.findAll({ where: { uuid: { [Op.notIn]: [...uuids] } } })
    return client
  }

  /**
   * Получить список всех клиентов
   * @returns Возвращает массив объектов `Client`
   */
  async getClients () {
    const clients = await Client.findAll({ attributes: { exclude: ['uuid'] } })
    return clients
  }

  // /**
  //  * Получить список всех клиентов c указанным статусом `online`
  //  * @param {Boolean} online сетевой статус
  //  * @returns Возвращает массив объектов `Client`
  //  */
  // async getClientsByStatus (online) {
  //   const clients = await Client.findAll({ where: { online }, attributes: { exclude: ['uuid'] } })
  //   return clients
  // }

  /**
   * Обновить сетевой статус клиента
   * @param {String} uuid Уникальный ключ
   * @param {Boolean} online Сетевой статус
   */
  async setClientStatus (uuid, online) {
    const client = await this.getClientByUUID(uuid)
    await client.update({ online })
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

  addLog () {}
}

export default new DatabaseController()
