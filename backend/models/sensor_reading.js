var mongoose = require('mongoose');

var sensor_reading = mongoose.model('sensor_reading',{
    sensor_id :{
        type : String
    },
    sensor_name :{
        type : String
    },
    sensor_type:{
        type: String
    },
    sensor_status : {
        type : String
    },
    sensor_location : {
        type:String
    },
    sensor_reading : {
        type:String
    },
    created_date : {
        type : String
    }
},"sensor_reading");

module.exports = {sensor_reading};