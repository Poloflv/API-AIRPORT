import { Router} from "express"

import {
    findAllPassengers,
    createPassenger,
    deletePassenger,
    findOnePassenger,
    updatePassenger
} from "./passengers.controller.js"
import { protect } from "../auth/auth.middleware.js";

export const router = Router();

// init features

// router.use(protect)

// Rutas
router.route("/").get(findAllPassengers).post(createPassenger);

router.route("/:id").get(findOnePassenger).patch(updatePassenger).delete(deletePassenger)

// lo de arriba es lo mismo que esto
// router.get("/passengers/:id",findOnePassenger )

// router.patch("/passengers/:id", updatePassenger )

// router.delete("/passengers/:id", deletePassenger )

// end features

