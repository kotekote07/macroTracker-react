import React, { useState, useEffect } from "react";
import FoodDataService from "../../services/food";
import Helper from "../../services/helper";

import "./styles.css"

import Button from "../Button/button";
import Navbar from "../navbar";

const FoodList = () => {

    const helper = new Helper();

    helper.userCheck();

    const foodService = new FoodDataService();

    const [foods, setFoods] = useState([]);

    let [count, setCount] = useState(0);

    useEffect(() => {
        getFoods();
    // eslint-disable-next-line
    }, [count]);

    async function getFoods() {
        try {
            const res = await foodService.getAll()
                setFoods(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteFood = async (id) => {
        let foodID = {
            id: id
        }
        const res = await foodService.removeFood(foodID);
        if(res.data === "deleted") {
            setCount(count + 1);
        }
    }

    const selectDelete = (data) => {
        let cont = document.getElementsByName("container")
        let btn = document.getElementsByName("delete-btn");
        for (let num = 0; num < cont.length; num++) {
            if (cont[num].id === data) {
                if (cont[num].style.border !== "1px solid red") {
                    cont[num].style.border = "1px solid red";
                    btn[num].style.display = "inline-block"
                } else {
                    cont[num].style.border = "1px solid black";
                    btn[num].style.display = "none"
            }
        }
    }
}

    return (
        <div>
            <Navbar />
            {foods.map((food) => {
                return (
                    <div onClick={() => selectDelete(food._id)} key={food._id} name="container" id={food._id} className="container">
                        <table className="food-table">
                            <tbody>
                                <tr>
                                    <td>{food.name}</td>
                                    <td></td>
                                    <td>{food.calories}</td>
                                </tr>
                                <tr>
                                    <td>{food.carbs}</td>
                                    <td>{food.fats}</td>
                                    <td>{food.proteins}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="delete-form">
                            <button onClick={() => deleteFood(food._id)} name="delete-btn" className="delete-btn btn btn-outline-danger">Delete</button>
                        </div>
                    </div>
                )
            })}
        <Button count={count}/>
        <div className="spacer"></div>
        </div>
        );
}
export default FoodList;