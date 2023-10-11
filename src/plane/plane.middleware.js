import { PlaneService } from "./plane.service.js";

const planeService = new PlaneService

export const validateExistPlane = async (req, res, next ) => {
    const { id } = req.params;

    const plane = await planeService.findOne(id)

    if(!plane){
        return res.status(404).json({
            status: 'error',
            message: `Plane not found with id: ${id}`
        })
    }

    req.plane = plane
    next()
}