import { Schema, model } from 'mongoose'

const hotelSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    }
)

// Modificar el toJSON para excluir datos en la respuesta
hotelSchema.methods.toJSON = function(){
    const { __v, ...hotel } = this.toObject()
    return hotel
}

// Crear y exportar el modelo
export default model('Hotel', hotelSchema)
