import Event from "./events.model.js"

// Crear un evento
export const createEvent = async(req, res)=>{
    try{
        const newEvent = new Event(req.body)
        const savedEvent = await newEvent.save()
        res.status(201).send({savedEvent})
    }catch(err){
        console.error(err)
        return res.status(400).send(
            {
                succes: true,
                message: 'Event created successfully'
            }
        )
    }
}

//Obtener todos
export const getAll = async (req, res)=>{
    try{
        const {limit = 20, skip = 0} = req.query
        const events = await Event.find()
            .skip(skip)
            .limit(limit)
        if(userModel.length === 0) return res.status(404).send(
            {
                succes: false,
                message: 'Events not found'
            }
        )
        return res.send(
            {
                succes: true,
                message: 'Events found: ',
                events,
                total:events.length
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                succes: false,
                message: 'General error',
                err
            }
        )
    }
}

// Obtener un evento por ID
export const get = async (req, res)=>{
    try{
        const{id} = req.params
        const event = await Event.findById(id)
        
        if(!event) return res.status(404).send(
            {
                succes: false,
                message: 'Event not found'
            }
        )
        return res.send(
            {
                succes: true,
                message: 'Event found',
                event
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                succes: false,
                message: 'General Error',
                err
            }
        )
    }
}

// Actualizar evento
export const update = async (req, res)=>{
    try{
        const {id} = req.params
        const updateData = req.body
        const event = await Event.findByIdAndUpdate(id, updateData, {new: true})

        if(!event) return res.status(404).send(
            {
                succes: false,
                message: 'Event not found'
            }
        )
        return res.send(
            {
                succes: true,
                message: 'Event updated successfully',
                event
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                succes: false,
                message: 'General Error',
                err
            }
        )
    }
}


// CANCELAR evento 

export const remove = async(req, res)=>{
    try{
        const {id} = req.params
        const event = await Event.findByIdAndUpdate(
            id,
            {status: false},
            {new: true}
        )
        if(!event) return res.status(404).send(
            {
                succes: false,
                message: 'Event not found'
            }
        )
        return res.send(
            {
                succes: true,
                message: 'Status for event changed successfully'
            }
        )
    }catch(err){
        console.error(err)
        return res.status(500).send(
            {
                succes: false,
                message: 'General error',
                err
            }
        )
    }
}