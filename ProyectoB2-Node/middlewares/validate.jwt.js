'use strict'

import jwt from 'jsonwebtoken';
import { findUser } from '../helpers/db.validators.js';

// Middleware para validar el token JWT
export const validateJwt = async (req, res, next) => {
    try {
        // Obtener la clave secreta del entorno
        const secretKey = process.env.SECRET_KEY;

        // Obtener el token de los headers
        const { authorization } = req.headers;

        // Verificar si se envió el token
        if (!authorization) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        // Desencriptar el token
        const decoded = jwt.verify(authorization, secretKey);

        // Buscar el usuario real en la base de datos
        const validateUser = await findUser(decoded.uid);

        if (!validateUser) {
            return res.status(404).send({
                success: false,
                message: 'User not found - Unauthorized'
            });
        }

        // Inyectar la información completa del usuario al request
        req.user = {
            uid: validateUser._id.toString(),
            name: validateUser.name,
            username: validateUser.username,
            role: validateUser.role,
            status: validateUser.status  // 🔥 ahora sí tienes status disponible
        };

        // Pasar al siguiente middleware
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).send({ message: 'Invalid token or expired' });
    }
};

// Middleware para validar el rol de administrador
export const isAdmin = async (req, res, next) => {
    try {
        const { user } = req;
        
        // Verificar si el usuario es administrador
        if (!user || user.role !== 'ADMIN') {
            return res.status(403).send({
                success: false,
                message: `You don't have access | username ${user.username}`
            });
        }

        if (user.status === false) {
            return res.status(403).send({
                success: false,
                message: `Your account is deleted, you cannot do any changes 👻 | username ${user.username}`
            })
        }
        
        // Pasar al siguiente middleware
        next();
    } catch (err) {
        console.error(err);
        return res.status(403).send({
            success: false,
            message: 'Unauthorized role'
        });
    }
};

export const isUser = async(req, res, next)=>{
    try{
        const { user } = req;
        console.log('🧾 User from token:', user);
        const { id } = req.params
        
        if(user.uid !== id) {
            return res.status(403).send({
                success: false,
                message: 'Unauthorized: You can only edit your own account 👻'
            })
        } else if (user.status === false){
            return res.status(403).send({
                success: false,
                message: `Your account is deleted, you cannot do any changes 👻 | username ${user.username}`
            })
        }
        
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send(
            {
                success: false,
                message: 'Unauthorized role'
            }
        )
    }
}

export const isUserOrAdmin = async (req, res, next) => {
    try {
        const { user } = req
        const { id } = req.params

        // Si es Admin, puede hacer cualquier cosa
        if (user.role === 'ADMIN') {
            return next()
        }

        // Si no es Admin, validar que esté actuando sobre su propio recurso
        if (user.uid !== id) {
            return res.status(403).send({
                success: false,
                message: 'Unauthorized: You can only manage your own resource 👻'
            })
        }

        // Además, validar que su cuenta esté activa
        if (user.status === false) {
            return res.status(403).send({
                success: false,
                message: `Your account is deleted, you cannot do any changes 👻 | username ${user.username}`
            })
        }

        next()
    } catch (err) {
        console.error(err)
        return res.status(403).send({
            success: false,
            message: 'Unauthorized role'
        })
    }
}

