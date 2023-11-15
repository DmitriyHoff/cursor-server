import { DataTypes, Model } from 'sequelize'
import db from '../index.js'

class Log extends Model {}

const model = Log.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: { tableName: 'clients' },
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    action_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: { tableName: 'actions' },
        key: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'cascade'
    }
  },
  {
    charset: 'utf8mb4',
    sequelize: db.sequelize,
    tableName: 'logs'
  }
)
export default model
