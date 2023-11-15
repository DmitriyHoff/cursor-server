export async function up (queryInterface, { DataTypes }) {
  await queryInterface.sequelize.query(`CREATE FUNCTION client_uuid() RETURNS trigger AS '
  BEGIN
      NEW.uuid := replace(gen_random_uuid ()::text, ''-'', '''');
      RETURN NEW;
  END;
' LANGUAGE plpgsql;`)
}

export async function down (queryInterface) {
  await queryInterface.sequelize.query(
    'DROP FUNCTION IF EXISTS TRIGGER client_uuid()'
  )
}
