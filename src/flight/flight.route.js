import express from 'express';
import { createFlight, deleteFlight, findAllFlights, findOneFlight, updateFlight } from './flight.controller.js';
export const router = express.Router()

router.route("/")
    .get(findAllFlights)
    .post(createFlight)

router.route("/:id")
    .get(findOneFlight)
    .patch(updateFlight)
    .delete(deleteFlight)