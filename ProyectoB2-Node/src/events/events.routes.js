import { Router } from 'express'
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { update, getAll, get, createEvent, remove} from './events.controller.js'

const api = Router()

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
    [validateJwt],
    createEvent
)

api.put(
    '/:id',
    [validateJwt, isAdmin],
    update
)

api.delete(
    '/:id',
    [validateJwt, isAdmin],
    remove
)

export default api