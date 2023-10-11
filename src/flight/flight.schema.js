import z from "zod"
import { extractValidationData } from "../common/utils/extractErrorData.js"

export const flightSchema = z.object({
    originId: z.number().max(100),
    destinationId: z.number(),
    planeId: z.number(),
    departureTime: z.string({
        invalid_type_error: "Date must be a correct format",
        required_error: "Date is required"
    }),
    checkIn: z.string({
        invalid_type_error: "Date must be a correct format",
        required_error: "Date is required"
    }),
})

export function validateflight(data) {
    const result = flightSchema.safeParse(data)

    const {hasError, errorMessages, data:flightData}= extractValidationData(result)

    return {
        hasError,
        errorMessages,
        flightData
    }
}

export function validatePartialFlight(data) {
    const result = flightSchema.partial().safeParse(data)

    const { hasError, errorMessages, data:flightData} = extractValidationData(result)

    return { 
        hasError,
        errorMessages,
        flightData
    }
}