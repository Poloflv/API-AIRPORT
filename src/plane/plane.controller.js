import { validatePartianPlane } from "./plane.schema.js"
import { PlaneService } from "./plane.service.js"

const planeService = new PlaneService()

export const findAllPlanes = async(req,res)=> {
    try {
        const plane = await planeService.findAll()

        return res.status(200).json(plane)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const createPlane = async(req,res)=> {
    try {
        const plane = await planeService.create(req.body);
        return res.status(201).json(plane)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const findOnePlane = async(req,res)=> {
    try {

        const {plane} = req;

        return res.status(200).json(plane)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const updatePlane = async(req,res)=> {
    try {
        const { plane } = req;

        const {hasError,errorMessages,planeData} = validatePartianPlane(req.body)

        if(hasError){
            return res.status(422).json({
                status: 'error',
                message: errorMessages
            })
        }

        const planeUpdated = await planeService.update(plane, planeData);

        return res.status(200).json(planeUpdated);
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const deletePlane = async(req,res)=> {
    try {
        const { plane } = req;

        await planeService.delete(plane)

        return res.status(204).json(null)
    } catch (error) {
        return res.status(500).json(error)
    }
}