import { validatePartianPlane } from "../plane/plane.schema.js"
import { validatePartialFlight } from "./flight.schema.js"
import { FlightService } from "./flight.service.js"

const flightService = new FlightService()

export const findAllFlights = async(req,res)=> {
    try {
        const flight = await flightService.findAll()

        return res.status(200).json(flight)
    } catch (error) {
        return res.status(500).json(error)
    }
} 

export const createFlight = async(req,res)=> {
    try {
        const flight = await flightService.create(req.body);
        return res.status(201).json(flight)
    } catch (error) {
        return res.status(500).json(error)
    }
} 

export const findOneFlight = async(req,res)=> {
    try {
        const {id} = req.params;
        
        const flight = await flightService.findOne(id)

        if(!flight){
            return res.status(404).json({
                status: 'error',
                message: 'Flight not found'
            })
        }
        return res.status(200).json(flight)
    } catch (error) {
        return res.status(500).json(error)
    }
} 

export const updateFlight = async(req,res)=> {
    try {
        const { id} = req.params;

        const { hasError,errorMessages, flightData} = validatePartialFlight(req.body)

        if(hasError){
            return res.status(422).json({
                status: 'error',
                message: errorMessages
            })
        }
        const flight = await flightService.findOne(id);

        if(!flight){
            return res.status(404).json({
                status: 'error',
                message: `Flight not found with id: ${id}`
            })
        }
        const flightUpdated =  await flightService.update(flight, flightData);

        return res.status(200).json(flightUpdated)
    } catch (error) {
        return res.status(500).json(error)
    }
} 

export const deleteFlight = async(req,res)=> {
    try {
        const {id} = req.params;

        const flight = await flightService.findOne(id)

        if(!flight) {
            return res.status(404).json({
                status: 'error',
                message: 'Flight not found'
            })
        }

        await flightService.delete(flight)

        return res.status(204).json(null)

    } catch (error) {
        return res.status(500).json(error)
    }
} 