var mongoose = require('mongoose');

var sensor_added = mongoose.model('sensor_added',{
    email:{
        type : String
    },
    cluster_id:{
        type : String
    },  
    node_id:{
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
    created_date : {
        type : String
    }

},"sensor_added");

module.exports = {sensor_added};