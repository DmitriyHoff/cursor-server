export async function up (queryInterface, { DataTypes }) {
  await queryInterface.createTable(
    'clients',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
      uuid: { type: DataTypes.STRING(36), allowNull: false, unique: true },
      online: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    {
      charset: 'utf8mb4'
    }
  )
}
export async function down (queryInterface, { DataTypes }) {
  await queryInterface.dropTable('clients')
}
