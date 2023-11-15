import { DataTypes, Model } from 'sequelize'
import db from '../index.js'

class ActionType extends Model {}

const model = ActionType.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, allowNull: false, unique: true }
  },
  {
    charset: 'utf8mb4',
    sequelize: db.sequelize,
    tableName: 'action_types'
  }
)
export default model
