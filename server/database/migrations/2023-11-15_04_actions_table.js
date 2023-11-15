export async function up (queryInterface, { DataTypes }) {
  await queryInterface.createTable(
    'actions',
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
      underscored: true
    }
  )
}
export async function down (queryInterface, { DataTypes }) {
  await queryInterface.dropTable('logs')
}
