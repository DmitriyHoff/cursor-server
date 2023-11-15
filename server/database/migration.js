import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import sequelize, { DataTypes } from 'sequelize'
import Migration from './models/_Migration.js'
import db from './index.js'

const logger = console

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const migrationsPath = path.join(__dirname, 'migrations')

/**
 * Выполняет все миграции из папки migrations
 */
export async function runMigrations () {
  const queryInterface = db.sequelize.getQueryInterface()
  await queryInterface.createTable('_migrations', {
    filename: DataTypes.STRING,
    appliedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  })

  logger.debug(`Scan folder "${migrationsPath}" for migrations`, {
    scope: 'migrations'
  })

  const list = await fs.promises.readdir(migrationsPath)
  const migrations = await Migration.findAll()

  for (const file of list) {
    if (!file.match(/\.js$/)) {
      continue
    }
    const appliedMigration = migrations.find(
      (migration) => migration.filename === file
    )
    if (appliedMigration) {
      logger.debug(
        `Migration "${file}" was applied at ${appliedMigration.appliedAt}`,
        { scope: 'migrations' }
      )
      continue
    }
    logger.debug(`Migration "${file}" applying...`, { scope: 'migrations' })

    const migrationFile = path.join(migrationsPath, file)
    const { up, down } = await import(pathToFileURL(migrationFile))

    if (!up || !down) {
      throw new Error(`Invalid migration functions in file ${file}`)
    }

    await up(queryInterface, sequelize)

    const item = new Migration({
      filename: file,
      appliedAt: Date.now()
    })
    await item.save()
  }
}

/**
 * Выполняет откат миграции
 * @param {*} name имя файла миграции
 */
export async function revertMigration (name) {
  const migrationFile = path.join(migrationsPath, name)

  logger.debug(`Reverting "${migrationFile}"...`, { scope: 'migrations' })

  const migration = await Migration.findOne({
    where: { filename: name }
  })
  if (!migration) {
    throw new Error(`Migration "${name}" not applied`)
  }

  const { up, down } = await import(pathToFileURL(migrationFile))

  if (!up || !down) {
    throw new Error(`Invalid migration functions in file ${migrationFile}`)
  }
  await down(db.sequelize.getQueryInterface(), sequelize)
  await migration.destroy()
}
