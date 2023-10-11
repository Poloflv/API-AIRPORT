import express  from 'express'

import { router } from './routes/routes.js';
import { AppError } from './errors/appError.js';

import { envs } from './config/enviroments/enviroments.js';
import { globalErrorHandle } from './errors/error.controller.js';
import { enableCors } from './config/plugins/cors.plugin.js';
import { enableMorgan } from './config/plugins/morgan.plugin.js';
import { limitRequest } from './config/plugins/rate-limit.plugin.js';
import { setSecurityHeaders } from './config/plugins/security-headers.plugin.js';
import { sanitizaterClean } from './config/plugins/sanitizater.plugin.js';
import { setParameterPollution } from './config/plugins/parameter-pollution.plugin.js';


// import {router as passengerRouter} from "./passengers/passengers.route.js"

const app = express()

const ACCEPTED_ORIGINS = ['http://localhost:8080', 'http://localhost:3001']

app.use(express.json())

//TODO: Refactorizar

if(envs.NODE_ENV === 'development'){
    enableMorgan(app)
}

enableCors(app, ACCEPTED_ORIGINS)

const rateLimit = limitRequest(10000, 60, 'Too many request from this IP, please try again in an hour!')
const helmet = setSecurityHeaders()
const sanitizater = sanitizaterClean()
const hpp = setParameterPollution()

app.use(rateLimit)
app.use(helmet())
app.use(sanitizater)
app.use(hpp())



// app.use("/api/v1", passengerRouter)
app.use("/api/v1", router)


app.all('*',(req,res,next) => {
    // return res.status(404).json({
    //     status: 'error',
    //     message: `Can't find ${req.originalUrl} on this server`
    // })

    // const err = new Error(`Can't find ${req.originalUrl} on this server`)
    // err.status = 'error'
    // err.statusCode = 404;
    // next(err)

    next(new AppError(`Can't find ${req.originalUrl} on this server`,404))
})
//basurero
app.use(globalErrorHandle)

export default app;
