//Modelo de Reservación

import { Schema, model } from 'mongoose';

const reservationSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        room: {
            type: Schema.Types.ObjectId,
            ref: 'Room',
            required: true
        },
        checkInDate: {
            type: Date,
            required: true
        },
        checkOutDate: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'cancelled'],
            default: 'pending'
        },
        services: [{
            type: Schema.Types.ObjectId,
            ref: 'Service'
        }],
        totalAmount: {
            type: Number,
            required: true
        },
        invoiceGenerated: {
            type: Boolean,
            default: false
        }
    }
)

//Modificar El toJSON para excluir datos en la respuesta
reservationSchema.methods.toJSON = function(){
    const {__v, ...user} = this.toObject()
    return user
}

//Crear y exportar el modelo    
export default model('Reservation', reservationSchema)
