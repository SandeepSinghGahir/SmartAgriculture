var mongoose = require('mongoose');

var Node = mongoose.model('Node',{
    node_name :{
        type : String
    },
    cluster_id:{
        type: String
    },
    status : {
        type : String
    },
    location : {
        type:String
    },
    created_date : {
        type : String
    }

},"Node");

module.exports = {Node};