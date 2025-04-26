import { Schema, model } from 'mongoose'

const roomSchema = new Schema(
    {
        number: {
            type: Number,
            required: true,
            unique: true
        },
        type: {
            type: String,
            enum: ['single', 'double', 'suite', 'family'],
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: ['available', 'occupied', 'maintenance'],
            default: 'available'
        }
    }
)

//Modificar el toJSON para excluir datos en la respuesta
roomSchema.methods.toJSON = function(){
    const { __v, ...room } = this.toObject()
    return room
}

//Crear y exportar el modelo
export default model('Room', roomSchema)
