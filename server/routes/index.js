import express from 'express'
import clients from './clients.js'

const router = express.Router()
router.use(clients)
export default router
