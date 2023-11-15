export async function up (queryInterface, { DataTypes }) {
  await queryInterface.createTable(
    'action_types',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      charset: 'utf8mb4',
      underscored: true
    }
  )
}
export async function down (queryInterface, { DataTypes }) {
  await queryInterface.dropTable('actions_types')
}
