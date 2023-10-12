import Flight from "./flight.model.js";

import { Op } from "sequelize";
export class FlightService {
    async findOne(id, status){

        // crearme un objeto con las condiciones de mi consulta
        let whereClause = {
            id: id,
            status: status
        }

        if(!status) {
            //pending, inProgess, done
            whereClause.status = {
                [Op.in]: ['pending', 'inProgress', 'done']
            }
        }

        return await Flight.findOne({
            where: whereClause
        })


        // return await Flight.findOne({
        //     where:{
        //         status:"pending",
        //         id,
        //     }
        // })
    }

    async findAll(){
        return await Flight.findAll({
            where: {
                status:{
                    [Op.notIn]: ['cancelled','done']
                }
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