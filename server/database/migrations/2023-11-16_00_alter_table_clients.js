export async function up (queryInterface, { DataTypes }) {
  return queryInterface.removeColumn(
    'clients',
    'online'
  )
}

export async function down (queryInterface, { DataTypes }) {
  return queryInterface.addColumn(
    'clients',
    'online',
    { type: DataTypes.BOOLEAN, defaultValue: false })
}
