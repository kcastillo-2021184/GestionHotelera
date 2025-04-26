import { Router } from 'express'
import { getAll, get, remove } from './bill.controller.js'
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'

const api = Router()

// Rutas privadas para Admin
api.get(
    '/',
    [validateJwt, isAdmin],
    getAll
)
api.get(
    '/:id',
    [validateJwt, isAdmin],
    get
)
api.delete(
    '/delete/:id',
    [validateJwt, isAdmin],
    remove
)

export default api
