export async function up (queryInterface, { DataTypes }) {
  await queryInterface.createTable(
    'logs',
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
      underscored: true
    }
  )
}
export async function down (queryInterface, { DataTypes }) {
  await queryInterface.dropTable('logs')
}
