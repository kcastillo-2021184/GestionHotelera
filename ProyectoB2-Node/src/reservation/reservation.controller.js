import Reservation from './reservation.model.js'
import Room from '../room/room.model.js'
import Service from '../service/service.model.js'
import Bill from '../bill/bill.model.js'

// Obtener todas las reservaciones
export const getAll = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const reservations = await Reservation.find()
            .skip(skip)
            .limit(limit)
            .populate('user', 'name email')
            .populate('room', 'number type')
            .populate('services', 'name price')

        if (reservations.length === 0) return res.status(404).send({ success: false, message: 'Reservations not found' })
        return res.send({
            success: true,
            message: 'Reservations found',
            reservations,
            total: reservations.length
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}

// Obtener una reservación por ID
export const get = async (req, res) => {
    try {
        const { id } = req.params
        const reservation = await Reservation.findById(id)
            .populate('user', 'name email')
            .populate('room', 'number type')
            .populate('services', 'name price')

        if (!reservation) return res.status(404).send({ success: false, message: 'Reservation not found' })
        return res.send({ success: true, message: 'Reservation found', reservation })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}

// Crear una reservación
export const create = async (req, res) => {
    try {
        const { user, room, checkInDate, checkOutDate, services = [] } = req.body

        // Validar coherencia de fechas
        if (new Date(checkInDate) >= new Date(checkOutDate)) {
            return res.status(400).send({
                success: false,
                message: 'Check-in date must be before check-out date'
            })
        }

        // Verificar disponibilidad en tiempo real
        const overlappingReservation = await Reservation.findOne({
            room,
            status: { $in: ['pending'] },
            $or: [
                { checkInDate: { $lt: new Date(checkOutDate), $gte: new Date(checkInDate) } },
                { checkOutDate: { $gt: new Date(checkInDate), $lte: new Date(checkOutDate) } },
                { checkInDate: { $lte: new Date(checkInDate) }, checkOutDate: { $gte: new Date(checkOutDate) } }
            ]
        })

        if (overlappingReservation) {
            return res.status(400).send({ success: false, message: 'Room not available for the selected dates' })
        }

        // Calcular total
        const roomData = await Room.findById(room)
        if (!roomData) return res.status(404).send({ success: false, message: 'Room not found' })

        let totalAmount = roomData.price

        if (services.length > 0) {
            const servicesData = await Service.find({ _id: { $in: services } })
            servicesData.forEach(service => {
                totalAmount += service.price
            })
        }

        // Crear la reservación
        const newReservation = new Reservation({
            user,
            room,
            checkInDate,
            checkOutDate,
            services,
            totalAmount
        })

        await newReservation.save()

        return res.send({ success: true, message: 'Reservation created successfully', reservation: newReservation })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}

// Actualizar reservación
export const update = async (req, res) => {
    try {
        const { id } = req.params
        const { checkInDate, checkOutDate } = req.body

        // Validar coherencia de fechas SOLO si ambos vienen
        if (checkInDate && checkOutDate) {
            if (new Date(checkInDate) >= new Date(checkOutDate)) {
                return res.status(400).send({
                    success: false,
                    message: 'Check-in date must be before check-out date'
                })
            }
        }

        const updateData = req.body

        const reservation = await Reservation.findByIdAndUpdate(id, updateData, { new: true })

        if (!reservation) return res.status(404).send({ success: false, message: 'Reservation not found' })
        return res.send({ success: true, message: 'Reservation updated successfully', reservation })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}

// Eliminar reservación
export const remove = async (req, res) => {
    try {
        const { id } = req.params

        const reservation = await Reservation.findByIdAndDelete(id)

        if (!reservation) return res.status(404).send({ success: false, message: 'Reservation not found' })
        return res.send({ success: true, message: 'Reservation deleted successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}

// Generar factura al finalizar estadía
export const generateInvoice = async (req, res) => {
    try {
        const { id } = req.params
        const reservation = await Reservation.findById(id)

        if (!reservation) return res.status(404).send({ success: false, message: 'Reservation not found' })

        if (reservation.invoiceGenerated) {
            return res.status(400).send({ success: false, message: 'Invoice already generated' })
        }

        const bill = new Bill({
            reservation: reservation._id,
            amount: reservation.totalAmount,
            issuedAt: new Date()
        })

        await bill.save()

        reservation.invoiceGenerated = true
        reservation.status = 'completed'
        await reservation.save()

        return res.send({ success: true, message: 'Invoice generated successfully', bill })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}
