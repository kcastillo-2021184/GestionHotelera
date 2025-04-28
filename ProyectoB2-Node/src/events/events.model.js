// Modelo de eventos

import { Schema, model } from "mongoose"

const eventSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [30, `Can't be overcome 30 characters`]
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxLength: [100, `Can't be overcome 100 characters`]
        },
        startDate: {
            type: Date,
            required: [true, 'Start Date is required']
        },
        finishDate: {
            type: Date,
            required: [true, 'Finish Date is required']
        },
        status: {
            type: Boolean,
            default: false // Estará falso porque no estará cancelado
        },
        hotel: {
            type: Schema.Types.ObjectId,
            ref: "Hotel",
            required: [true, 'Hotel ID is required']
        },
        additional: [
            {
                type: String,
                maxLength: [250, `Can't be overcome 100 characters`]
            }
        ]
    },
    {
        timestamps: true,
    }
)

eventSchema.methods.toJSON = function () {
    const { __v, ...event } = this.toObject()
    return event
}


export default model("Event", eventSchema)