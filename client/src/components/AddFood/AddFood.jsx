import React from "react";
import "./styles.css";

import FoodDataService from "../../services/food";

import Navbar from "../navbar";

const AddFood = () => {

    const foodService = new FoodDataService();

    const saveInfo = e => {
        // this prevents default behavior of refreshing window
        e.preventDefault()
        var data = {
            name: e.target.newName.value,
            carbs: e.target.carbs.value,
            fats: e.target.fats.value,
            proteins: e.target.proteins.value
        }
        foodService.addFood(data)
        window.location = "/foods"
    }


    return (
        <div>
            <Navbar />
            <div className="addFood-form">
                <form onSubmit={saveInfo}>
                    <input required name="newName" className="food-input" type="text" placeholder="Name"></input>
                    <input required min={0} name="carbs" className="food-input" type="number" placeholder="Carbs"></input>
                    <input required min={0} name="fats" className="food-input" type="number" placeholder="Fats"></input>
                    <input required min={0} name="proteins" className="food-input" type="number" placeholder="Proteins"></input>
                    <button type="submit" className="food-input-button btn btn-outline-light">+</button>
                </form>
            </div>
        </div>
    )
}

export default AddFood;