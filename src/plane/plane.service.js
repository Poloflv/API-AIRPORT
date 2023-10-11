import Plane from "./plane.model.js";


export class PlaneService {
    async findOne(id){
        return await Plane.findOne({
            where:{
                status:true,
                id,
            }
        })
    }

    async findAll(){
        return await Plane.findAll({
            where: {
                status: true
            }
        })

    }

    async create(data){
        return await Plane.create(data)

    }

    async update(plane,data){
        return await plane.update(data)

    }

    async delete(plane){
        return await plane.update({
            status: false
        })


    }
}