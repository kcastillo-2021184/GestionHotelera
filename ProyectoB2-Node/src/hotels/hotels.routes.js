import { Router } from 'express'
import {
    getHotels,
    getHotelsByCategory,
    createHotel,
    updateHotel,
    deleteHotel
} from './hotels.controller.js'
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'
import { mostRequestedHotels, mostReservedHotels } from './hotels.controller.js'

const api = Router()

// Rutas privadas para Admin
api.get(
    '/',
    getHotels
)
api.get(
    '/by-category',
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

api.get(
    '/mostRequestedHotels', 
    mostRequestedHotels
)

api.get(
    '/mostReserved',
    mostReservedHotels
)

export default api
