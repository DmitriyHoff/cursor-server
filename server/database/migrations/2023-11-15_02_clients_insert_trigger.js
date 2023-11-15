export async function up (queryInterface, { DataTypes }) {
  await queryInterface.sequelize.query(`CREATE TRIGGER tg_client_insert BEFORE INSERT ON clients
  FOR EACH ROW EXECUTE PROCEDURE client_uuid();`)
}

export async function down (queryInterface) {
  await queryInterface.sequelize.query(
    'DROP FUNCTION IF EXISTS TRIGGER tg_client_insert'
  )
}
