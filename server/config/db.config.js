export default {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: '12345',
  DB: 'cursor_db',
  PORT: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
