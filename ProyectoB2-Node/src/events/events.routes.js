import { Router } from 'express'
import { validateJwt } from '../../middlewares/validate.jwt.js'
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
    [validateJwt],
    update
)

api.delete(
    '/:id',
    [validateJwt],
    remove
)

export default api