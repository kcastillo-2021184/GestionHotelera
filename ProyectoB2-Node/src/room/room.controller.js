import Room from './room.model.js'

// Obtener todas las habitaciones
export const getAll = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const rooms = await Room.find()
            .populate('hotel', 'name address category') // Mostrar solo ciertos campos del hotel
            .skip(Number(skip))
            .limit(Number(limit))

        if (rooms.length === 0) return res.status(404).send({ success: false, message: 'Rooms not found' })

        return res.send({
            success: true,
            message: 'Rooms found',
            rooms,
            total: rooms.length
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}

// Obtener habitación por ID
export const get = async (req, res) => {
    try {
        const { id } = req.params
        const room = await Room.findById(id)
            .populate('hotel', 'name address category')

        if (!room) return res.status(404).send({ success: false, message: 'Room not found' })
        return res.send({ success: true, message: 'Room found', room })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}

// Crear nueva habitación
export const create = async (req, res) => {
    try {
        const { number, type, capacity, price, description, hotel } = req.body

        const roomExists = await Room.findOne({ number })
        if (roomExists) return res.status(400).send({ success: false, message: 'Room number already exists' })

        const newRoom = new Room({
            number,
            type,
            capacity,
            price,
            description,
            hotel
        })

        await newRoom.save()

        return res.send({ success: true, message: 'Room created successfully', room: newRoom })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}

// Actualizar habitación
export const update = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body

        const room = await Room.findByIdAndUpdate(id, updateData, { new: true })
            .populate('hotel', 'name address category')

        if (!room) return res.status(404).send({ success: false, message: 'Room not found' })
        return res.send({ success: true, message: 'Room updated successfully', room })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}

// Eliminar habitación
export const remove = async (req, res) => {
    try {
        const { id } = req.params

        const room = await Room.findByIdAndDelete(id)

        if (!room) return res.status(404).send({ success: false, message: 'Room not found' })
        return res.send({ success: true, message: 'Room deleted successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}

export const getRoomsByHotel = async (req, res) => {
  try {
    const { hid } = req.query;
    const rooms = await Room.find({ hotel: hid });
    res.status(200).json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};


