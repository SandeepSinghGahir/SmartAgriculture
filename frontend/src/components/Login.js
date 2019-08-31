import React, {Component} from 'react';
import '../App.css';
import axios from 'axios';
import swal from 'sweetalert2'
import { connect } from 'react-redux';
import {Charts} from "react-google-charts";


class Login extends Component {
    constructor(){
        super();
        
        this.state = {
            email: "",
            password: "",
            
        };
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }  
  
    emailChangeHandler(e) {

        this.setState({ email: e.target.value });
        console.log("email change handlet" + this.state.email)
        e.target.value == "" ? document.getElementById("email-error").innerHTML = "Please enter the field" :
            document.getElementById("email-error").innerHTML = "";
    }
    passwordChangeHandler(e) {
        this.setState({ password: e.target.value });
        e.target.value == "" ? document.getElementById("password-error").innerHTML = "Please enter the field" :
            document.getElementById("password-error").innerHTML = "";
    }
    validateEmail(email){
        if (email.trim() == "") {
            document.getElementById("email-error").innerHTML = "Please enter your email address";
            return false;
        }
        return true;
    }
    validatePassword(password){
        if (password.trim() == "") {
            document.getElementById("password-error").innerHTML = "Please enter your password";
            return false;
        }
        return true;
    }



    submitLogin = e => {
        //prevent page from refresh
        e.preventDefault();
        console.log("inside submit login from client side..")
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        console.log("user " + data.email + " pwd " + data.password)
        console.log("with credentials true")
        let emailErrorPresent = !this.validateEmail(this.state.email) ? true : false;
        let passwordErrorPresent = !this.validatePassword(this.state.password) ? true : false;
        this.props.onSubmitHandle(data);
    }

    render(){         
        return(
            <div>
                   <div>
              <div class = "jumbotron  jumbotron-fluid p-3 mb-2 bg-success text-white" style={{background: '#32CD32'}}>
                <div class = "container">
                    <h1 class ="h1 text-center"style= {{color:"white"  }}>SmartAgro</h1>
                    <p class = "lead text-center" style= {{color:"white"}} >Be Smarter be Effective</p>
                </div>
              </div>


              <form method="post">

                  <div class="container col-md-8">
                      <p></p>
                      <div class="login-form">
                          <div class="main-div">
                              <div align="center" style={{ fontSize: '20px' }}>Log in</div>
                              <div class="panel" align="left">
                              </div>
                              <div><input type="hidden" name="type" value="Traveler" /></div>
                              <div class="form-group">
                                  <input onChange={this.emailChangeHandler} type="text" class="form-control" name="email"
                                      placeholder="Email address" required="true" />
                              </div>
                              <div id="email-error" class="error"></div>
                              <div class="form-group">
                                  <input onChange={this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password" required="true" />
                              </div>
                              <div id="password-error" class="error"></div>
                              <button onClick={this.submitLogin} class="btn btn-primary">Log In</button>
                              <p align="center">Need an account?<a href="/register" style={{ color: '#007bff' }}>&nbsp;&nbsp;&nbsp;Sign Up</a></p>
                          </div>
                      </div>
                  </div>
              </form>
            </div>
            </div> 
        )
    }
}


const mapDispatchStateToProps = dispatch => {
    console.log("hi in mapdispatch...")
    return {
        onSubmitHandle : (data) => {
            console.log("before post")
            axios.post('http://localhost:3001/login', data,{ withCredentials: true })
                .then((response) => {
                    console.log("after post")
                    console.log("response from backend server ",response)
                    // if (response.status === 403) {
                    //     console.log("Incorrect Credentials")
                    //     swal('Incorrect Password!', "Incorrect Credentials", 'error');
                    //          }
                        if (response.code === 404) {
                        console.log("User Not found")
                        swal({
                            type: 'error',
                            title: 'Email not registered.',
                            text: 'You entered invalid credentials or your email not registered!'
                        })
                            }

                            if (response.status == 200) {
                                console.log("success")
                                // swal({
                                //     type: 'success',
                                //     title: 'login Credentials.',
                                //     text: 'You entered invalid credentials or your email not registered!'
                                // })
                                window.location.href = "http://localhost:3000/dashboard";
                            } 
                        console.log("response fetched..", response.data.resData)
                        dispatch({type: 'USER_INFO',payload :response.data.updatedList, statusCode : response.status})
                      
            })
        }
    }
}

export default connect(null,mapDispatchStateToProps)(Login);