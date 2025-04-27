import { Router } from 'express'
import {
    getHotels,
    getHotelsByCategory,
    createHotel,
    updateHotel,
    deleteHotel
} from './hotel.controller.js'
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'

const api = Router()

// Rutas privadas para Admin
api.get(
    '/',
    [validateJwt],
    getHotels
)
api.get(
    '/category/:category',
    [validateJwt],
    getHotelsByCategory
)
api.post(
    '/',
    [validateJwt, isAdmin],
    createHotel
)
api.put(
    '/update/:id',
    [validateJwt, isAdmin],
    updateHotel
)
api.delete(
    '/delete/:id',
    [validateJwt, isAdmin],
    deleteHotel
)

export default api
