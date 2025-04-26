import { Router } from 'express'
import { getAll, get, create, update, remove, generateInvoice } from './reservation.controller.js'
import { validateJwt, isAdmin, isUser, isUserOrAdmin } from '../../middlewares/validate.jwt.js'
import { updateReservationValidator } from '../../helpers/validators.js'

const api = Router()

// Rutas privadas (sólo Admin)
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
    [validateJwt, isUser],
    create
)
api.put(
    '/update/:id',
    [validateJwt, isUserOrAdmin, updateReservationValidator],
    update
)
api.delete(
    '/delete/:id',
    [validateJwt, isUserOrAdmin],
    remove
)
api.post(
    '/invoice/:id',
    [validateJwt, isAdmin],
    generateInvoice
)

export default api
