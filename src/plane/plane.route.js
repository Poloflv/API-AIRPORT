import express from 'express';
import { createPlane,
        deletePlane,
        findAllPlanes,
        findOnePlane,
        updatePlane } from './plane.controller.js';
import { validateExistPlane } from './plane.middleware.js';
export const router = express.Router()


router.route("/")
    .get(findAllPlanes)
    .post(createPlane)



router.route("/:id")
    .get( validateExistPlane,findOnePlane)
    .patch(validateExistPlane,updatePlane)
    .delete(validateExistPlane,deletePlane)