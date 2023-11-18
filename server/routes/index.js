import express from 'express'
import clients from './clients.js'
import logs from './logs-id.js'

const router = express.Router()
router.use('/clients', clients)
router.use('/logs/:id', logs)

export default router
