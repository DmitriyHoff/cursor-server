import { DataTypes, Model } from 'sequelize'
import db from '../index.js'

class Action extends Model {}

const model = Action.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: { tableName: 'action_types' },
        key: 'id'
      },
      onDelete: 'restrict',
      onUpdate: 'cascade'
    },
    params: { type: DataTypes.JSON },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  },
  {
    charset: 'utf8mb4',
    sequelize: db.sequelize,
    tableName: 'actions'
  }
)
export default model
