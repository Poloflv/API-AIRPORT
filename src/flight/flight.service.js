import Flight from "./flight.model.js";


export class FlightService {
    async findOne(id){
        return await Flight.findOne({
            where:{
                status:"pending",
                id,
            }
        })
    }

    async findAll(){
        return await Flight.findAll({
            where: {
                status:"pending"
            }
        })
    }

    async create(data){
        return await Flight.create(data)
    }

    async update(flight,data){
        return await flight.update(data)
    }

    async delete(flight){
        return await flight.update({
            status: 'cancelled'
        })

    }
}