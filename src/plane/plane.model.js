import {  DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const Plane = sequelize.define('plane', { 
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER,
        field: 'plane_id'
    },
    planeNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'plane_number'
    },
    model: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    capacity:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    airline: {
        type: DataTypes.ENUM("AeroGlobe", "AeroTronix","VelocityAir","AirQuest","StartLink")
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

export default Plane;