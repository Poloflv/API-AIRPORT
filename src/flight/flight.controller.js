import { CityService } from "../city/city.service.js"
import { envs } from "../config/enviroments/enviroments.js"
import { httpClient } from "../config/plugins/http-client.plugin.js"
import { AppError } from "../errors/appError.js"
import { catchAsync } from "../errors/catchAsync.js"
import { validatePartianPlane } from "../plane/plane.schema.js"
import { validatePartialFlight } from "./flight.schema.js"
import { FlightService } from "./flight.service.js"

const flightService = new FlightService()
const cityService = new CityService()

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

        const {status} = req.query;

        
        const flight = await flightService.findOne(id, status)

        if(!flight){
            return res.status(404).json({
                status: 'error',
                message: `Flight not found with id: ${id}`
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

        //TODO: no se deberia poder eliminiar un vuelo pendiente, si ese vuelo tiene tiquetes vendidos

        const flight = await flightService.findOne(id, 'pending')

        if(!flight) {
            return res.status(404).json({
                status: 'error',
                message: `Flight not found with id: ${id}`
            })
        }

        await flightService.delete(flight)

        return res.status(204).json(null)

    } catch (error) {
        return res.status(500).json(error)
    }
} 
//TODO: hacer la importacion de la parte de flight.route.js
export const approveFlight = catchAsync(async(req,res,next) => {

    const {id} =req.params;

    const flight = await flightService.findOne(id, 'pending');

    if(!flight){
        return next(new AppError(`flight with id: ${id} not found!`,404))
    }
    const originCity = await cityService.findOneCity(flight.originId);

    if(!originCity){
        return next (new AppError('city of origin does not exist'));
    }

    const destinationCity = await cityService.findOneCity(flight.destinationId)

    if(!destinationCity){
        return next(new AppError("city of destiny doesn't exist"))
    }


    const weatherConditions = await httpClient.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${originCity.lat}&lon=${originCity.long}&appid=${envs.API_KEY_WEATHERMAP}`
    )

    if(weatherConditions.weather[0].main === 'Cloud'){
        return next(
            new AppError('weather conditions do not meet the requeriments for tokeoff',400)
        )
    }

    const updatedFlight = await flightService.update( flight, {
        status: 'inProgress',
        checkIn: new Date()
    })
    return res.status(200).json(updatedFlight)
})