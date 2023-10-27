import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "animate.css";

import Login from "./components/Login/Login";
import FoodList from "./components/FoodList/foods";
import AddFood from "./components/AddFood/AddFood";
import PrevFoods from "./components/PrevFoods/prevFoods"

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path={"/"} Component={Login}/>
          <Route path={"/login"} Component={Login}/>
          <Route path="/foods" Component={FoodList}/>
          <Route path="/addFood" Component={AddFood}/>
          <Route path="/previous-foods" Component={PrevFoods}/>
        </Routes>
      </div>
  );
}

export default App;
