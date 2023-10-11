
import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const Flight = sequelize.define('flights', {
    id: {
        primaryKey: true,
        // allowNull: false,
        autoIncrement:true,
        type: DataTypes.INTEGER,

    },
    originId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'origin_id'
    },
    destinationId:{
        allowNull:false,
        type: DataTypes.INTEGER,
        field: 'destination_id'
    },
    planeId:{
        type: DataTypes.INTEGER,
        field:'plane_id'
    },
    departureTime:{
        type: DataTypes.DATE,
        allowNull: false,
        field: "departure_time"
    },
    checkIn:{
        type:DataTypes.DATE
    },
    status: {
        type: DataTypes.ENUM("pending","inProgress","done","cancelled","delayed"),
        defaultValue:"pending"
    }
})

export default Flight;