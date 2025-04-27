import Hotel from '../models/hotel.model.js'

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
        res.json(hotels)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener hoteles', error: error.message })
    }
}

// Buscar hoteles por categoría (filtro)
export const getHotelsByCategory = async (req, res) => {
    try {
        const { category } = req.params
        const hotels = await Hotel.find({ category })

        res.json(hotels)
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar hoteles por categoría', error: error.message })
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
