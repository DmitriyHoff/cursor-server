import { DataTypes, Model } from 'sequelize'
import database from '../index.js'

class Migration extends Model {}

const model = Migration.init(
  {
    filename: { type: DataTypes.STRING, primaryKey: true },
    appliedAt: { type: DataTypes.DATE, allowNull: false }
  },
  {
    sequelize: database.sequelize,
    tableName: '_migrations'
  }
)
export default model
