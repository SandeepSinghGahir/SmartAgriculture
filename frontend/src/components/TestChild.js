import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';
import { userInfo } from 'os';

//select cluster_name,cluster_id(show nhi karna bus),location,status from cluster where user_email=neha@gmail.com (obviously role=farmer)

class TestChild extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            cluster_id:"",
            update_email_state:this.props.pass_email
        }
        this.setHandlerClusterId=this.setHandlerClusterId.bind(this)
    }  

    setHandlerClusterId(e)
    {
        console.log("cluster id in testchild",e.target.value)
        this.setState({
            cluster_id:e.target.value
        })
        
    }
    // componentDidMount()
    // {
    //     console.log("componentDidMount TestChild",this.props.pass_email)
    //     console.log("componentDidMount TestChild this.state.update_email_state",this.state.update_email_state)
    // }
    // componentWillMount()
    // {
    //     console.log("componentWillMount TestChild",this.props.pass_email)
    //     console.log("componentDidMount TestChild this.state.update_email_state",this.props.pass_email)
    // }

    componentWillReceiveProps(props)
    {
        var self = this;
        const {user_email} =self.props;
        console.log("TestChild will mount props update_email..",this.props.pass_email)
        console.log("TestChild will mount state update_email..",this.state.update_email_state)
        const data={
            // id: "Kavya@gmail.com"
            id:this.props.pass_email
        }
        axios.post("http://localhost:3001/getClusterList",data)
        .then(function (response) {
            console.log("response in getClusterList",response.data.data);
         
            if (response.data.data != null) {
                self.setState({
                    data: response.data.data
                })
            }
            if (response.status === 204) {
                console.log("No cluster found for this farmer");
                console.log("data" + response.data.status)
                return
            }
        })
    }


    render(){ 
             
       return(
           <div>
                                                         
          <div class="form-group">
              Select Cluster 
      <select value={this.state.cluster_id}  onChange={this.setHandlerClusterId}>
        {this.state.data.map((cluster) => <option key={cluster.id} value={cluster.cluster_name}>{cluster.cluster_name}</option>)}
      </select>
    </div>
           </div>
       )
       }
   


}

export default TestChild;