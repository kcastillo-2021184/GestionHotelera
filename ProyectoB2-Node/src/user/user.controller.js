//Logica de negocio

import { encrypt, checkPassword } from "../../utils/encrypt.js"
import User from "./user.model.js"
 
//Obtener todo
export const getAll = async(req, res)=>{
    try{
        const {limit = 20, skip = 0} = req.query
        const users = await User.find()
            .skip(skip)
            .limit(limit)

        if(users.length === 0 )return res.status(404).send({message: 'Users not found', success:false})
        return res.send(
            {
            success:true,
            message: 'Users found: ', 
            users,
            total:users.length
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send({success:false, message: 'General error', err})
    }
}

//Obtener usuario por ID
export const get = async(req, res)=>{
    try{
        const {id} = req.params
        const user = await User.findById(id)

        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found',
                user
            }
        )

    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error',
                err
            }
        )
        
    }
}


// Update de usuario a si mismo (CLIENT)
export const update = async(req, res) => {
    try {
        const { id } = req.params
        const { name, surname, username, email, phone } = req.body
        const role = 'CLIENT'

        // Verificar si el usuario existe
        const user = await User.findById(id)
        if(!user) return res.status(404).send({
            success: false,
            message: 'User not found'
        })

        // Crear objeto con los campos a actualizar
        const updateData = {}
        if(name) updateData.name = name
        if(surname) updateData.surname = surname
        if(username) updateData.username = username
        if(email) updateData.email = email
        if(phone) updateData.phone = phone
        if(role) updateData.role = role

        // Actualizar usuario
        const updatedUser = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true } // Retorna el documento actualizado
        )

        return res.send({
            success: true,
            message: 'User updated successfully 👻',
            user: updatedUser
        })

    } catch(err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: 'General Error',
            err
        })
    }
}


//Update de password
export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;

        // Verificar si el usuario existe
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        // Verificar si la contraseña actual coincide
        const isMatch = await checkPassword(user.password, currentPassword);
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Current password is incorrect",
            });
        }

        // Encriptar la nueva contraseña
        const hashedPassword = await encrypt(newPassword);

        // Actualizar la contraseña en la base de datos
        user.password = hashedPassword;
        await user.save();

        return res.send({
            success: true,
            message: "Password updated successfully 👻",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            success: false,
            message: "General Error",
            err,
        });
    }
};


// Crear usuario ADMIN al iniciar el programa
export const initializeAdmin = async () => {
    try {
        let adminExists = await User.findOne({ role: 'ADMIN' })
        if (!adminExists) {
            
            const adminUser = new User({
                name: 'admin',
                surname: 'ADMIN',
                username: 'admin',
                email: 'admin123@gmail.com',
                password: 'FortiPrime2@',
                phone: '12345678',
                role: 'ADMIN'
            })
            
            await adminUser.save()
            console.log('Admin user created successfully 👑')
        } else {
            console.log('Admin user already exists 👑')
        }
    } catch (err) {
        console.error('Error creating admin user 👑', err)
    }
}
