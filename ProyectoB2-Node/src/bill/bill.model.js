import { Schema, model } from 'mongoose'

const billSchema = new Schema(
    {
        reservation: {
            type: Schema.Types.ObjectId,
            ref: 'Reservation',
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        issuedAt: {
            type: Date,
            default: Date.now
        }
    }
)

//Modificar el toJSON para excluir datos en la respuesta
billSchema.methods.toJSON = function(){
    const { __v, ...bill } = this.toObject()
    return bill
}

//Crear y exportar el modelo
export default model('Bill', billSchema)
