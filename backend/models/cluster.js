var mongoose = require('mongoose');

var Cluster = mongoose.model('Cluster',{
    cluster_id:{
        type : String
    },
    cluster_name :{
        type : String
    },
    user_email:{
        type: String
    },
    status : {
        type : String
    },
    field_type:{
        type: String
    },
    location : {
        type:String
    },
    created_date : {
        type : String
    }

},"Cluster");

module.exports = {Cluster};