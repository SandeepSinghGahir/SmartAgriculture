'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var port = 8080;
var app = express();
var cookieParser = require('cookie-parser');
var { User } = require('./models/user');
var { Cluster } = require('./models/cluster')
var { Node } = require('./models/node')
var { mongoose } = require('./db/mongoose');
var { sensor_added } = require('./models/sensor_added')
var { sensor_reading } = require('./models/sensor_reading')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//require('./app/routes')(app);
// app.use(passport.initialize());
// app.use(passport.session());
// // Bring in defined Passport Strategy
// require('./passport')(passport);
// var requireAuth = passport.authenticate('jwt', { session: false });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.post('/login', function (req, res) {
    var user = req.body.email;
    var password = req.body.password;
    console.log("email:", user + " password:", password);
    User.findOne({email: user}, function(err, result) {
        if (err) { /* handle err */ 
        console.log("error fetching data")
        res.status(400).json({
            success: false,
            message: 'error fetching data'

        });
        }
        if (result) {
            // we have a result
            console.log("found result")
            res.status(200).json({ success: true, rows: result });
        } else {
            // we don't
            //console.log("no results found")
            res.status(404).json({
                success: false,
                message: 'Cannot fetch details.'
            });
        }
    })
})
app.get('/getFarmerList', function (req, res) {
    console.log("Get Farmers list  " );
    User.find({
        role: 'Farmer'
    }  //success callback of finduser
    ,function (err, rows) {
                    if (err) {
                        console.log("failure callback 1")
                        res.status(401).json({
                            message: 'failed to fetch'
                        });
                    }
                    if (rows.length > 0) {
                        console.log("rows generated",rows.length)
                        console.log("rows data",rows)
                        res.status(200).json({
                            data:rows,
                            message: 'data fetched'
                        });
                    }
                    else {
                        console.log("failure callback 2")
                        res.status(400).json({
        
                            message: 'db access error'
                        });
                    }
                  
                });
});

app.post('/getNodeList', function (req, res) {
    var id = req.body.id
    console.log("Get Node list  " );
    console.log("for cluster id   " ,req.body.id);
    Node.find({
        cluster_id : id               
     }  //success callback of finduser
    ,function (err, rows) {
                    if (err) {
                        console.log("failure callback 1")
                        res.status(401).json({
                            message: 'failed to fetch'
                        });
                    }
                    if (rows.length > 0) {
                        console.log("rows generated",rows.length)
                        console.log("rows data",rows)
                        res.status(200).json({
                            data:rows,
                            message: 'data fetched'
                        });
                    }
                    else {
                        console.log("failure callback 2")
                        res.status(400).json({
        
                            message: 'db access error'
                        });
                    }
                  
                });
});

app.post('/getClusterList', function (req, res) {
    var id = req.body.id
    console.log("Get Clusters list  " );
    console.log("id   " ,req.body.id);
    Cluster.find({
        user_email: id
        //user_email: 'based on selected farmer from getFarmerList (previous page)' 
        //  Here we wil pick the select cluster_id,cluster_name, location, status for a particular farmer
     }  //success callback of finduser
    ,function (err, rows) {
                    if (err) {
                        console.log("failure callback 1")
                        res.status(401).json({
                            message: 'failed to fetch'
                        });
                    }
                    if (rows.length > 0) {
                        console.log("rows generated",rows.length)
                        console.log("rows data",rows)
                        res.status(200).json({
                            data:rows,
                            message: 'data fetched'
                        });
                    }
                    else {
                        console.log("failure callback 2")
                        res.status(400).json({
        
                            message: 'db access error'
                        });
                    }
                  
                });
});

app.post('/getClusterById', function (req, res) {
    var id = req.body.id
    console.log("Get Clusters by Id method called..  " );
    console.log("id of cluster is  " ,id);
    Cluster.find({
        _id: id
        //user_email: 'based on selected farmer from getFarmerList (previous page)' 
        //  Here we wil pick the select cluster_id,cluster_name, location, status for a particular farmer
     }  //success callback of find cluster by id
    ,function (err, rows) {
                   if (rows) {
                        console.log("rows generated",rows.length)
                        console.log("rows data",rows)
                        res.status(200).json({
                            data:rows,
                            message: 'data fetched'
                        });
                    }
                    if (err) {
                        console.log("failure callback 1",err +"rows"+rows)
                        res.status(400).json({
                            status:400,
                            message: 'failed to fetch'
                        });
                    } 
                    // else {
                    //     console.log("failure callback 2")
                    //     res.status(401).json({
                    //         message: 'db access error'
                    //     });
                    // }
                  
                });
});
app.post('/getNodeById', function (req, res) {
    var id = req.body.id
    console.log("Get Node by Id method called..  " );
    console.log("id of Node is  " ,id);
    Node.find({
        _id: id      
     }  
    ,function (err, rows) {
                   if (rows) {
                        console.log("rows generated",rows.length)
                        console.log("rows data",rows)
                        res.status(200).json({
                            data:rows,
                            message: 'data fetched'
                        });
                    }
                    if (err) {
                        console.log("failure callback 1",err +"rows"+rows)
                        res.status(400).json({
                            status:400,
                            message: 'failed to fetch'
                        });
                    } 
                    // else {
                    //     console.log("failure callback 2")
                    //     res.status(401).json({
                    //         message: 'db access error'
                    //     });
                    // }
                  
                });
});
app.post('/getSensorById', function (req, res) {
    var id = req.body.id
    console.log("Get Sensor by Id method called..  " );
    console.log("id of Sensor is  " ,id);
    sensor_added.find({
        _id: id      
     }  
    ,function (err, rows) {
                   if (rows) {
                        console.log("rows generated",rows.length)
                        console.log("rows data",rows)
                        res.status(200).json({
                            data:rows,
                            message: 'data fetched'
                        });
                    }
                    if (err) {
                        console.log("failure callback 1",err +"rows"+rows)
                        res.status(400).json({
                            status:400,
                            message: 'failed to fetch'
                        });
                    } 
                    // else {
                    //     console.log("failure callback 2")
                    //     res.status(401).json({
                    //         message: 'db access error'
                    //     });
                    // }
                  
                });
});
app.post('/deleteClusterById', function (req, res) {
    var id = req.body.id
    console.log("API /deletClusterById called..  " );
    console.log("id of cluster is  " ,id);
    Cluster.findOneAndDelete({
        _id: id
    }
    ,function (err, rows) {
                    if (err) {
                        console.log("failure to delete")
                        res.status(401).json({
                            message: 'failed to delete'
                        });
                    }
                    if (rows.length > 0) {
                        console.log("rows generated",rows.length)
                        console.log("rows data",rows)
                        res.status(201).json({
                            data:rows,
                            message: 'data fetched'
                        });
                    }
                    else {
                        console.log("deleted successfully")
                        res.status(200).json({
                            message: 'Not able to fetch details since its deleted!'
                        });
                    }
                  
                });
});
app.post('/deleteNodeById', function (req, res) {
    var id = req.body.id
    console.log("API /deleteNodeById called..  " );
    console.log("id of Node is  " ,id);
    Node.findOneAndDelete({
        _id: id
    }
    ,function (err, rows) {
                    if (err) {
                        console.log("failure to delete")
                        res.status(401).json({
                            message: 'failed to delete'
                        });
                    }
                    if (rows.length > 0) {
                        console.log("rows generated",rows.length)
                        console.log("rows data",rows)
                        res.status(201).json({
                            data:rows,
                            message: 'data fetched'
                        });
                    }
                    else {
                        console.log("deleted successfully")
                        res.status(200).json({
                            message: 'Not able to fetch details since its deleted!'
                        });
                    }
                  
                });
});
app.post('/deleteSensorById', function (req, res) {
    var id = req.body.id
    console.log("API /deleteSensorById called..  " );
    console.log("id of sensor is  " ,id);
    sensor_added.findOneAndDelete({
        _id: id
    }
    ,function (err, rows) {
                    if (err) {
                        console.log("failure to delete")
                        res.status(401).json({
                            message: 'failed to delete'
                        });
                    }
                    if (rows.length > 0) {
                        console.log("rows generated",rows.length)
                        console.log("rows data",rows)
                        res.status(201).json({
                            data:rows,
                            message: 'data fetched'
                        });
                    }
                    else {
                        console.log("deleted successfully")
                        res.status(200).json({
                            message: 'Not able to fetch details since its deleted!'
                        });
                    }
                  
                });
});
app.post('/updateCluster', function (req, res) {
    console.log("uclusterID in /updateCluster",req.body.uclusterID)
    console.log("new_status in /updateCluster",req.body.new_status)
    Cluster.findOneAndUpdate({ _id:  req.body.uclusterID},
        {
          $set: {
            status: req.body.new_status,
          }
        },{ new: true }, function (err, result) {
                if (result) {
                    console.log(result);
                    console.log("in update success block",result)
                    res.status(200).json({
                        data:result,
                        message: 'data updated successfully'
                    });
                    //return; //this is so important if we got the result just return , dont execute below calls
                }else if(err)
                {
                console.log(err, "in update failure block error data below")
                res.status(400).json({
                    data:rows,
                    message: 'Failed to fetch data'
                });
                }

            })
        })

    
app.post('/updateNode', function (req, res) {
            console.log("unodeID in /updateNode",req.body.unodeID)
            console.log("new_status in /updateNode",req.body.new_status)
            Node.findOneAndUpdate({ _id:  req.body.unodeID},
                {
                  $set: {
                    status: req.body.new_status,
                  }
                },{ new: true }, function (err, result) {
                        if (result) {
                            console.log(result);
                            console.log("in update success block",result)
                            res.status(200).json({
                                data:result,
                                message: 'data updated successfully'
                            });
                            //return; //this is so important if we got the result just return , dont execute below calls
                        }else if(err)
                        {
                        console.log(err, "in update failure block error data below")
                        res.status(400).json({
                            data:rows,
                            message: 'Failed to fetch data'
                        });
                        }
        
                    })
                })
app.post('/updateSensor', function (req, res) {
                    console.log("usensorID in /updateSensor",req.body.usensorID)
                    console.log("new_status in /updateSensor",req.body.new_status)
                    sensor_added.findOneAndUpdate({ _id:  req.body.usensorID},
                        {
                          $set: {
                            sensor_status: req.body.new_status,
                          }
                        },{ new: true }, function (err, result) {
                                if (result) {
                                    console.log(result);
                                    console.log("in update success block",result)
                                    res.status(200).json({
                                        data:result,
                                        message: 'data updated successfully'
                                    });
                                    //return; //this is so important if we got the result just return , dont execute below calls
                                }else if(err)
                                {
                                console.log(err, "in update failure block error data below")
                                res.status(400).json({
                                    data:rows,
                                    message: 'Failed to fetch data'
                                });
                                }
                
                            })
                        })     
app.post('/addcluster', function (req, res) {
    console.log("adding clusters....")
   var clusterName= req.body.clusterName;
   var createdDate=req.body.createdDate;
   var status= req.body.status;
   var fieldType= req.body.fieldType;
   var user_email = req.body.email;
   console.log("user_email",user_email)
  console.log( "clus name",clusterName)
   console.log("createdDate",createdDate)
   console.log("status",status)
   console.log("cluster_type",fieldType)
   console.log("createdDate",createdDate)

   var newClusterdata = new Cluster({
   cluster_name: req.body.clusterName,
   created_date:req.body.createdDate,
    status:req.body.status,
    field_type: req.body.fieldType,
    user_email : req.body.email,
});
newClusterdata.save().then((cluster)=> {
    console.log("Property created : ", cluster);
   // successCallback()
    res.status(201).json({
        data:cluster,
        message: 'Cluster created'
    });
}, (err) => {
    console.log("Error Creating cluster");
    res.status(400).json({
        message: 'Cannot create cluster.'
    });
}), function (err) {
    console.log(err);
    res.status(401).json({
        message: 'connection error with db'
    });
  }
})

app.post('/addnode', function (req, res) {
    console.log("Adding nodes....")

   var node_name= req.body.node_name;
   var cluster_id= req.body.cluster_id;
   var status= req.body.status;
   var location= req.body.location;
   var created_date=req.body.created_date;
   
   //var cluster_id = req.params.cluster_id; ?? coming from params
   console.log("node_name",node_name)
   console.log("cluster_id",cluster_id)
   console.log("status",status)
   console.log("location",location)
   console.log("created_date",created_date)
  
   //console.log("cluster_id",cluster_id)  ?? ? coming from params
   var newNodedata = new Node({
    node_name : node_name,
    cluster_id : cluster_id,
    status :  status,
    location : location,
    created_date : created_date
});

newNodedata.save().then((node)=> {
    console.log("Property created : ", node);
   // successCallback()
    res.status(201).json({
        data:node,
        message: 'Node created'
    });
}, (err) => {
    console.log("Error Creating node");
    res.status(400).json({
        message: 'Cannot create node.'
    });
}), function (err) {
    console.log(err);
    res.status(401).json({
        message: 'connection error with db'
    });
  }
})

app.post('/Signup', function (req, res) {
    console.log("Registering New User with below details...");
        var  firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var usertype = req.body.usertype;
        var email = req.body.email;
        var password = req.body.password;

        console.log("email: ", email + " name: ", firstName +
      "lastname: ", lastName + "password", password+ "Role",usertype)

      var newUserdata = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.usertype,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
      });
      newUserdata.save().then((user)=> {
        console.log("User created : ", user);
        res.status(201).json({
          data:user,
          message: 'You are Ready to go.'
        });
      }, (err) => {
        console.log("Couldn't Sign up");
        res.status(400).json({
          message: " Cannot create user"
        });
      }), function (err) {
        console.log(err);
        res.status(401).json({
          message: 'connection error with db'
        });
      }
})




app.get('/getSensorList', function (req, res) {
    var  id = req.body.id
 console.log("Get sensor list  " );
   // console.log("id   " ,req.body.id);
    sensor_added.find({
        //user_id: id
        //user_email: 'based on selected farmer from getFarmerList (previous page)' 
        //  Here we wil pick the select cluster_id,cluster_name, location, status for a particular farmer
     }  //success callback of finduser
    ,function (err, rows) {
                    if (err) {
                        console.log("failure callback 1")
                        res.status(401).json({
                            message: 'failed to fetch'
                        });
                    }
                    if (rows.length > 0) {
                        console.log("rows generated",rows.length)
                        console.log("rows data",rows)
                        res.status(200).json({
                            data:rows,
                            message: 'data fetched'
                        });
                    }
                    else {
                        console.log("failure callback 2")
                        res.status(400).json({
                            message: 'db access error'
                        });
                    }
                  
                });
});

app.post('/getSensorReadings', function (req, res) {
    var sensor_id = req.body.sensor_id
    console.log("Backend get readings  for  sensor_id:  ",req.body.sensor_id);

    sensor_reading.find({
        sensor_id : sensor_id
     }  //success callback of finduser
    ,function (err, rows) {
        console.log("error : ",err)
        if (err) {
            console.log("failure callback 1")
            res.status(401).json({
                message: 'failed to fetch'
            });
        }
        if (rows.length > 0) {
            console.log("rows generated",rows.length)
            console.log("rows data",rows)
            res.status(200).json({
                data:rows,
                message: 'data fetched'
            });
        }
        else {
            console.log("failure callback 2")
            res.status(400).json({
                message: 'db access error'
            });
        }
                  
                });
});

app.post('/deleteSensor', function (req, res) {
    var del_sensor_id = req.body.del_sensor_id
    console.log("delete sensor backend post :  ",req.body.del_sensor_id );
    sensor_added.deleteMany({
        _id : del_sensor_id
     }  //success callback of finduser
    ,function (err, rows) {
        console.log("error : ",err)
                    if (err==null) {
                        console.log("Successfully deleted record for sensor id", del_sensor_id)   
                        res.send(200);                 
                    }                    
                   else {
                        console.log("failure callback 2 sensor delete")
                        res.status(400).json({        
                            message: 'db access error'
                        });
                    }
                  
                });
});

//Sandeep API Ends

app.post('/addSensor', function (req, res) {
    console.log("Adding sensor....")

   var email= req.body.email;
   var cluster_id= req.body.cluster_id;
   var node_id = req.body.node_id;
   var sensor_name = req.body.sensor_name;
   var sensor_type = req.body.sensor_type;
   var sensor_status = req.body.sensor_status;
   var sensor_location = req.body.sensor_location;
   var created_date=req.body.created_date;
  
   
   var newSensordata = new sensor_added({
    email : email,
    cluster_id : cluster_id,
    node_id : node_id,
    sensor_name : sensor_name,
    sensor_type : sensor_type,
    sensor_status : sensor_status,
    sensor_location : sensor_location,    
    created_date : created_date
});

newSensordata.save().then((sensor)=> {
    console.log("Property created : ", sensor);
   // successCallback()
    res.status(201).json({
        data:sensor,
        message: 'Sensor Added'
    });
}, (err) => {
    console.log("Error Adding Sensor");
    res.status(400).json({
        message: 'Cannot add sensor.'
    });
}), function (err) {
    console.log(err);
    res.status(401).json({
        message: 'connection error with db'
    });
  }
})

app.post('/filterSensorByDates', function (req, res){
    console.log("API /filterSensorByDates called.." ,req.body)
    var  end_date = req.body.end+ " 00:00:00"
    var start_date = req.body.start + " 00:00:00"
    var sensor_n =  req.body.sensor_name
    console.log("inside call start_date ", start_date)
    console.log("inside call end_date ",end_date)   
    sensor_reading.find({
    created_date :{ $lte:end_date  ,$gte: start_date },
    sensor_name : sensor_n
    },function (err,result) {
            if (result) {
                console.log("successCallback callback 1")
                console.log("rows generated are" + result)
                res.status(200).json({    
                    data:result,    
                    message: 'data filtered and new rows generated'
                });
            }
            else if(err){
                console.log("failure callback 2")
                res.status(401).json({        
                    message: 'Match not found'
                });
            }   
    }), function(err){
        console.log("Not able to find data in db")
        console.log("error is",err)
          res.status(400).json({        
                            message: 'db access error'
                        });
    }
})

app.listen(3001, () => {
    console.log("Mongodb and backend server started");
})