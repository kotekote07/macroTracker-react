import React from "react";

import "./styles.css"

import FoodDataService from "../../services/food";
import Helper from "../../services/helper";

const Login = () => {

    const foodService = new FoodDataService();
    const helper = new Helper();

    helper.quickLogin()

    async function currentUser(e) {
        e.preventDefault()
        let data = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        
        let user = await foodService.getUser(data)
        if (user.data !== "") {
            window.location = "/foods"
            localStorage.setItem('user', user.data);
        } else {
            let message = document.getElementById("invalid-message");
            if (message.style.display === "block") {
                message.classList.remove("animate__zoomInUp")
                message.classList.add("animate__headShake")
                message.addEventListener('animationend', () => {
                    message.classList.remove("animate__headShake");
                }) 
            } else {
                message.style.display = "block"
                message.classList.add("animate__zoomInUp")
            }
        }
    }

    return (
        <div>
            <div className="login-title">
                <h2>Welcome!</h2>
            </div>
            <div>
                <form className="login-form" onSubmit={currentUser}>
                    <input name="username" className="login-input form-control-lg" type="text" placeholder="Email"/>
                    <input name="password" className="login-input form-control-lg" type="password" placeholder="Password"/>
                    <button className="btn btn-lg btn-outline-primary" type="submit">Login</button>
                </form>
            </div>
            <div id="invalid-message" className="animate__animated invalid-login">
                <p>Sorry! Incorrect username or password</p>
            </div>
        </div>
    )
}

export default Login;