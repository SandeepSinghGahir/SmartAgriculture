import React, { Component } from 'react'
import '../App.css';
import axios from 'axios';
import Swal from 'sweetalert2'
import swal from 'sweetalert2';


export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            usertype: "",
            email: "",
            password: "",
            phoneNumber: "",
            emailAlreadyPresent: false,
        };
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleusertypeChange = this.handleusertypeChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlephoneNumberChange = this.handlephoneNumberChange.bind(this);
        this.handleRegistration = this.handleRegistration.bind(this);

    }

    handleFirstNameChange(e) {
        this.setState({ firstName: e.target.value });
        e.target.value == "" ? document.getElementById("fname-error").innerHTML = "Please enter your first name" :
            document.getElementById("fname-error").innerHTML = "";

    }

    handleLastNameChange(e) {
        this.setState({ lastName: e.target.value });
        e.target.value == "" ? document.getElementById("lname-error").innerHTML = "Please enter your last name" :
            document.getElementById("lname-error").innerHTML = "";

    }

    handleusertypeChange(e) {
        console.log(e.target.value)
        this.setState({ usertype: e.target.value });
        
      }

      handlephoneNumberChange(e) {
          this.setState({ phoneNumber: e.target.value });
        }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
        e.target.value == "" ? document.getElementById("password-error").innerHTML = "Please enter your email" :
            document.getElementById("password-error").innerHTML = "";
        // const regex = /^([a-zA-Z0-9@*#]{8,15})$/;
        // if (!regex.test(String(this.state.password))) {
        //     document.getElementById("password-error").innerHTML = "Password must consists of at least 8 alphanumeric characters and not more than 15 characters";
        //     return false;
        // }
    }
    handleEmailChange(e) {
        this.setState({ email: e.target.value });
        e.target.value == "" ? document.getElementById("email-error").innerHTML = "Please enter your password" :
            document.getElementById("email-error").innerHTML = "";
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(String(this.state.email).toLowerCase())) {
            document.getElementById("email-error").innerHTML = "Please enter valid email address";
            return false;
        }
    }

    handleRegistration(e) {
        e.preventDefault();
        const data = { firstName: this.state.firstName,
            lastName: this.state.lastName,
             email: this.state.email,
          password: this.state.password,
          usertype: this.state.usertype,
           phoneNumber: this.state.phoneNumber };

        axios.post('http://localhost:3001/Signup', data)
            .then((response) => {
                if (response.status === 201) {
                    Swal('Registered succesfully!', "You have been successfully registered.", 'success');
                }
                if (response.status === 400) {
                    console.log(response)
                    Swal('Email already exist!', "You have been already registered", 'error');
                }
            });
    }

    validateFirstNameFormat(firstName) {
        if (firstName.trim() == "") {
            document.getElementById("name-error").innerHTML = "Please enter your first name";
            return false;
        }
        return true;
    }
    validateLastNameFormat(lastName) {
        if (lastName.trim() == "") {
            document.getElementById("name-error").innerHTML = "Please enter your last name";
            return false;
        }
        return true;
    }



    render() {
        return (
            <div>

                <form>
                    <div class="container">
                        <p></p>
                        <div align="center">Register</div>
                        <p align="center">Already have an account?<a href="/" style={{ color: '#007bff' }}>&nbsp;&nbsp;&nbsp;Log in</a></p>
                        <div class="login-form">
                            <div class="main-div">

                                <div class="form-group">
                                    <input onChange={this.handleFirstNameChange} type="text" class="form-control" name="firstName"
                                        placeholder="First Name" required="true" />
                                </div>
                                <div id="fname-error" class="error"></div>


                                <div class="form-group">
                                    <input onChange={this.handleLastNameChange} type="text" class="form-control" name="lastName"
                                        placeholder="Last Name" required="true" />
                                </div>
                                <div id="lname-error" class="error"></div>

                                <div class="form-group">
                                <select onChange={this.handleusertypeChange}  class = "form-control " name = "usertype" required>
                                <option value="">Choose Role</option>
                                  <option value="Farmer">Farmer</option>
                                  <option value="IOT support">IOT support</option>
                                  <option value="Infrastructure manager">Infrastructure manager</option>
                                </select>
                                </div>

                                <div class="form-group">
                                    <input onChange={this.handleEmailChange} type="email" class="form-control" name="email"
                                        placeholder="Email Address" required="true" />
                                </div>
                                <div id="email-error" class="error"></div>


                                <div class="form-group">
                                    <input onChange={this.handlePasswordChange} type="password" class="form-control"
                                    name="password" placeholder="Password" required="true" />
                                </div>
                                <div id="password-error" class="error"></div>

                                <div class="form-group">
                                    <input onChange={this.handlephoneNumberChange} type="number" class="form-control"
                                    name="phoneNumber" placeholder="Phone Number" required="true" />
                                </div>
                                <div id="password-error" class="error"></div>

                                <button onClick={this.handleRegistration} class="btn btn-primary">Sign Me Up</button>
                            </div>

                        </div>
                    </div>
                </form>

            </div>

        )
    }
}
