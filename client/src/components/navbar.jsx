import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import FoodDataService from "../services/food";

const Navbar = () => {

  const foodService = new FoodDataService();

  const cookies = new Cookies();

  const [username, setUsername] = useState([]);

  useEffect(() => {
    getName();
    // eslint-disable-next-line
  }, []);

  async function getName() {
    const res = await foodService.getUserName()
    setUsername(res.data)
  }

  // update this to async await
  const logout = () => {
    try {
      foodService.logout()
      cookies.remove('user')
    } catch (error) {
      console.log(error)
    }
    window.location = "/login"
  }
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/foods">{username}</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a onClick={logout} className="nav-link" href="/login">Sign Out</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;