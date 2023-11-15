import ActionType from './ActionType.js'
import Action from './Action.js'
import Client from './Client.js'
import Log from './Log.js'

ActionType.hasMany(Action, { foreignKey: 'type_id' })
Action.hasMany(Log, { foreignKey: 'action_id' })
Action.belongsTo(ActionType, { foreignKey: 'type_id' })
Client.hasMany(Log, { foreignKey: 'client_id' })
Log.belongsTo(Action, { foreignKey: 'action_id' })
Log.belongsTo(Client, { foreignKey: 'client_id' })

export { ActionType, Action, Client, Log }
