import Bill from './bill.model.js'

// Obtener todas las facturas
export const getAll = async (req, res) => {
    try {
        const { limit = 20, skip = 0 } = req.query
        const bills = await Bill.find()
            .skip(skip)
            .limit(limit)
            .populate('reservation')

        if (bills.length === 0) return res.status(404).send({ success: false, message: 'Bills not found' })
        return res.send({
            success: true,
            message: 'Bills found',
            bills,
            total: bills.length
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}

// Obtener una factura por ID
export const get = async (req, res) => {
    try {
        const { id } = req.params
        const bill = await Bill.findById(id)
            .populate('reservation')

        if (!bill) return res.status(404).send({ success: false, message: 'Bill not found' })
        return res.send({ success: true, message: 'Bill found', bill })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}

// Eliminar una factura
export const remove = async (req, res) => {
    try {
        const { id } = req.params
        const bill = await Bill.findByIdAndDelete(id)

        if (!bill) return res.status(404).send({ success: false, message: 'Bill not found' })
        return res.send({ success: true, message: 'Bill deleted successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ success: false, message: 'General Error', err })
    }
}
