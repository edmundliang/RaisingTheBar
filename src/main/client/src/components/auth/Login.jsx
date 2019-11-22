import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../Theme.scss';

export default class LoginForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        formData.append("email", this.state["email"]);
        formData.append("password", this.state["password"]);
        xhr.addEventListener("load", this.formResults)
        xhr.open("POST", '/login')
    }

    formResults(e) {
        if (e.target.status === 202) {

            //login was sucessful
        } else if (e.target.status === 401) {
            //The credentials werent recognized by the server
        } else {
            //Sometthing strange went wrong
        }
    }

    render() {
        return (
            <div className="FormCenter">

                <div className="FormTitle">
                    <NavLink to="/login" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Login</NavLink> or <NavLink exact to="/signup" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
                </div>
                
                <form onSubmit={this.handleSubmit} className="FormFields center">
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                        <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">Password</label>
                        <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <button className="FormField__Button mr-20">Login</button>
                    </div>
                    <div className="FormField">
                        <Link to="/forgot-password" className="FormField__Link">Need to reset your password?</Link>
                    </div>
                </form>
            </div>
        );
    }
}
