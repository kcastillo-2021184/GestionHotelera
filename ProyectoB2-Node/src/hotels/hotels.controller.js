import Hotel from './hotels.model.js'
import Room from '../room/room.model.js'
import Reservation from '../reservation/reservation.model.js'

// Crear hotel
export const createHotel = async (req, res) => {
    try {
        const { name, address, category } = req.body

        const newHotel = new Hotel({ name, address, category })
        await newHotel.save()

        res.status(201).json(newHotel)
    } catch (error) {
        res.status(500).json({ message: 'Error al crear hotel', error: error.message })
    }
}

// Listar todos los hoteles
export const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find()
        res.json({data: hotels})
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener hoteles', error: error.message })
    }
}

// Obtener hoteles por categoría (desde query params)
export const getHotelsByCategory = async (req, res) => {
    try {
        const { category } = req.query

        if (!category) {
            return res.status(400).send({
                success: false,
                message: 'Category query param is required'
            })
        }

        const hotels = await Hotel.find({ category })

        if (hotels.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No hotels found in this category'
            })
        }

        return res.send({
            success: true,
            message: 'Hotels found',
            hotels
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'Server error', err })
    }
}


// Editar hotel
export const updateHotel = async (req, res) => {
    try {
        const { id } = req.params
        const { name, address, category } = req.body

        const updatedHotel = await Hotel.findByIdAndUpdate(
            id,
            { name, address, category },
            { new: true }
        )

        if (!updatedHotel) {
            return res.status(404).json({ message: 'Hotel no encontrado' })
        }

        res.json(updatedHotel)
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar hotel', error: error.message })
    }
}

// Eliminar hotel
export const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params

        const deletedHotel = await Hotel.findByIdAndDelete(id)

        if (!deletedHotel) {
            return res.status(404).json({ message: 'Hotel no encontrado' })
        }

        res.json({ message: 'Hotel eliminado correctamente' })
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar hotel', error: error.message })
    }
}

export const mostRequestedHotels = async (req, res)=>{
    try {
        const hotels = await Room.aggregate(
            [
                {
                    $match: { status: 'occupied' }
                },

                {
                    $group: {
                        _id: '$hotel',
                        occupiedRooms: { $sum: 1 }
                    }
                },

                { 
                    $sort: { occupiedRooms: -1 }
                },

                {
                    $lookup: {
                        from: 'hotels',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'hotelInfo'
                    }
                },

                {
                    $unwind: '$hotelInfo'
                },

                {
                    $project: {
                        _id: 0,
                        hotel: '$hotelInfo',
                        occupiedRooms: 1
                    }
                }
            ]
        )
        res.status(200).send(
            {
                message: "Hoteles más solicitados",
                hotels
            }
        )
    } catch (error) {
        res.status(500).send(
            { 
                message: 'Error al eliminar hotel', 
                error
            }
        )
    }
}

export const mostReservedHotels = async (req, res) => {
    try {
        const hotels = await Reservation.aggregate([
            {
                $match: { status: { $in: ['pending', 'completed', 'cancelled'] } }
            },
            {
                $lookup: {
                    from: 'rooms',
                    localField: 'room',
                    foreignField: '_id',
                    as: 'roomInfo'
                }
            },
            { $unwind: '$roomInfo' },
            {
                $group: {
                    _id: '$roomInfo.hotel',
                    totalReservations: { $sum: 1 }
                }
            },
            { $sort: { totalReservations: -1 } },
            {
                $lookup: {
                    from: 'hotels',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'hotelInfo'
                }
            },
            { $unwind: '$hotelInfo' },
            {
                $project: {
                    _id: 0,
                    hotel: '$hotelInfo',
                    totalReservations: 1
                }
            }
        ]);

        res.status(200).send({
            success: true,
            message: 'Hoteles con más reservaciones (todos los estados)',
            hotels
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: 'Error al obtener hoteles con más reservaciones',
            error
        });
    }
};


