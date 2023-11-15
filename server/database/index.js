import Sequelize from 'sequelize'
import config from '../config/db.config.js'
import pg from 'pg'

class Database {
  constructor (sequelize) {
    this.sequelize = sequelize
  }

  openConnection () {
    return this.sequelize.authenticate()
  }

  closeConnection () {
    return this.sequelize.close()
  }

  async createDatabase () {
    const client = new pg.Client({
      host: config.HOST,
      port: config.PORT,
      database: 'postgres',
      user: config.USER,
      password: config.PASSWORD
    })
    try {
      await client.connect()
      const dbQuery = await client.query('SELECT FROM pg_database WHERE datname=$1', [config.DB])

      if (dbQuery.rowCount === 0) {
        await client.query(`CREATE DATABASE ${config.DB}`)
        console.log(`Database '${config.DB}' was created`)
      } else {
        console.log(`Database '${config.DB}' already exists`)
      }
    } catch (e) {
      console.log('ERROR: ', e)
      process.exit(1)
    } finally {
      await client.end()
    }
  }
}

export default new Database(
  new Sequelize({
    database: config.DB,
    username: config.USER,
    password: config.PASSWORD,
    host: config.HOST,
    dialect: config.dialect,
    port: config.PORT,
    timezone: '+00:00',
    define: {
      timestamps: false
    },
    dialectOptions: {
      multipleStatements: true
    },
    logging: false
  })
)
