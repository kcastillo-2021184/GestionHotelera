import { Router } from 'express'
import { getAll, get, create, update, remove, getRoomsByHotel } from './room.controller.js'
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'

const api = Router()

api.get(
  '/by-hotel',
  [validateJwt],
  getRoomsByHotel
);

// Rutas privadas para Admin
api.get(
    '/',
    [validateJwt],
    getAll
)
api.get(
    '/:id',
    [validateJwt],
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
