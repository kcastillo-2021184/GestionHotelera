import { Router } from 'express'
import { getAll, get, create, update, remove } from './room.controller.js'
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
api.post(
    '/',
    [validateJwt, isAdmin],
    create
)
api.put(
    '/update/:id',
    [validateJwt, isAdmin],
    update
)
api.delete(
    '/delete/:id',
    [validateJwt, isAdmin],
    remove
)

export default api
