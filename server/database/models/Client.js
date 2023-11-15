import { DataTypes, Model } from 'sequelize'
import db from '../index.js'

class Client extends Model {}

const model = Client.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    uuid: { type: DataTypes.STRING(36), unique: true },
    online: { type: DataTypes.BOOLEAN, defaultValue: false }
  },
  {
    charset: 'utf8mb4',
    sequelize: db.sequelize,
    tableName: 'clients'
  }
)
export default model
