import { Schema, model } from 'mongoose'

const serviceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            default: ''
        },
        price: {
            type: Number,
            required: true
        }
    }
)

//Modificar el toJSON para excluir datos en la respuesta
serviceSchema.methods.toJSON = function(){
    const { __v, ...service } = this.toObject()
    return service
}

//Crear y exportar el modelo
export default model('Service', serviceSchema)
