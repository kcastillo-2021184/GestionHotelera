import Service from './service.model.js'

// Obtener todos los servicios
export const getAll = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const services = await Service.find()
            .skip(skip)
            .limit(limit)

        if (services.length === 0) return res.status(404).send({ success: false, message: 'Services not found' })
        return res.send({
            success: true,
            message: 'Services found',
            services,
            total: services.length
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}

// Obtener un servicio por ID
export const get = async (req, res) => {
    try {
        const { id } = req.params
        const service = await Service.findById(id)

        if (!service) return res.status(404).send({ success: false, message: 'Service not found' })
        return res.send({ success: true, message: 'Service found', service })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}

// Crear nuevo servicio
export const create = async (req, res) => {
    try {
        const { name, description, price } = req.body

        const serviceExists = await Service.findOne({ name })
        if (serviceExists) return res.status(400).send({ success: false, message: 'Service name already exists' })

        const newService = new Service({
            name,
            description,
            price
        })

        await newService.save()

        return res.send({ success: true, message: 'Service created successfully', service: newService })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}

// Actualizar un servicio
export const update = async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body

        const service = await Service.findByIdAndUpdate(id, updateData, { new: true })

        if (!service) return res.status(404).send({ success: false, message: 'Service not found' })
        return res.send({ success: true, message: 'Service updated successfully', service })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}

// Eliminar un servicio
export const remove = async (req, res) => {
    try {
        const { id } = req.params

        const service = await Service.findByIdAndDelete(id)

        if (!service) return res.status(404).send({ success: false, message: 'Service not found' })
        return res.send({ success: true, message: 'Service deleted successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}
