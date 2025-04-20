//Rutas de funciones de usuario
import { Router } from 'express'
import { get, getAll, update, updatePassword } from './user.controller.js'
import { validateJwt, isAdmin, isUser } from '../../middlewares/validate.jwt.js'
import {updateUserValidator, updatePasswordValidator} from '../../helpers/validators.js'
 
const api = Router()
 
//Rutas privadas
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
api.put(
    '/update/:id',
    [validateJwt,isUser, updateUserValidator ],
    update
)
api.put(
    '/password/:id',
    [validateJwt, updatePasswordValidator, isUser],
    updatePassword
)

export default api