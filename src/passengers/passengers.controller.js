// import { AppError } from "../errors/appError.js"
// import { catchAsync } from "../errors/catchAsync.js";
import { AppError,catchAsync} from '..//errors/index.js'
import { validatePartialPassenger, validatePassenger } from "./passengers.schema.js"
import {PassengerService} from "./passengers.service.js"
const passengerService = new PassengerService();




export const findAllPassengers = catchAsync(async (req, res, next) => {

        const passengers = await passengerService.findAllPassengers()

        return res.json(passengers)

})

// createPassenger
export const createPassenger = catchAsync( async(req, res) => {

    // escribir un codigo para que se creen los datos

        const { hasError, errorMessages, passengerData} = validatePassenger(req.body)

        if(hasError){
            return res.status(422).json({
                status: 'error',
                message: errorMessages
            })
        }

        const passenger = await passengerService.createPassenger(passengerData)

        return res.status(201).json(passenger)
    }
)

// findOnePassenger
export const findOnePassenger = catchAsync( async (req, res, next ) => {



        const { id } = req.params

        const passenger = await passengerService.findOnePassenger(id)

        if(!passenger){
            // return res.status(404).json({
            //     status: 'error',
            //     message: `Passenger with id: ${id} not found`
            // })

            return next(new AppError(`Passenger with id: ${id} not found`, 404))
        }

    
        res.json(passenger)



    // {
    //     message: "este endpoint obtendra un passagero dado su id",
    //     id: id
    // }
})
// updatePassenger
export const updatePassenger =catchAsync( async (req, res) => {


        const { hasError, errorMessages, passengerData} = validatePartialPassenger(req.body)

        if(hasError) {
            return res.status(422).json({
                status: 'error',
                message: errorMessages
            })
        }

        //1. obtener el id del pasajero a actualizar
        const { id } = req.params
        //2. buscar el pasajero que vamos a actualizar

        // a que peror voy a pintarle el pelo
        const passenger = await passengerService.findOnePassenger(id)
        //3. validar si el pasajero existe
    
        if(!passenger) {
            return res.status(404).json({
                status: 'error',
                message: `Passenger with id ${ id } not found`
            })
        }
        //4. en caso de que exista, se procede a actualizar el pasajero
        const updatedPassenger = await passengerService.updatePassenger(passenger, passengerData)
        //5. retornamos el pasajero actualizado
    
        return res.json(updatedPassenger)

    // {
    //     message: "este endpoint actualizara el estado del pasajero",
    //     id
    // }
})
// deletePassenger
export const deletePassenger = catchAsync( async (req,res)=> {


        const { id } = req.params;

        const passenger = await passengerService.findOnePassenger(id)
    
        if(!passenger){
            return res.status(404).json({
                status: 'error',
                message: `Passenger with id: ${id} not found`
            })
        }
    
        await passengerService.deletePassenger(passenger)
    
    
        return res.status(204).json(null)

})