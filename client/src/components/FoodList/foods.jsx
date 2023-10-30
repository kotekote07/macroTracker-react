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
        let incBtn = document.getElementsByName("increase-btn");
        let decBtn = document.getElementsByName("subtract-btn");
        for (let num = 0; num < cont.length; num++) {
            if (cont[num].id === data) {
                if (cont[num].style.border !== "1px solid red") {
                    cont[num].style.border = "1px solid red";
                    btn[num].style.display = "inline-block"
                    incBtn[num].style.display = "inline-block"
                    decBtn[num].style.display = "inline-block"
                } else {
                    cont[num].style.border = "1px solid black";
                    btn[num].style.display = "none"
                    incBtn[num].style.display = "none"
                    decBtn[num].style.display = "none"
                }
            }
        }
    }
    
    const increaseQty = async (data) => {
        let newAmnt = {
            id: data[0],
            amount: data[1] + 1
        }
        let res = await foodService.updateAmnt(newAmnt);
        if (res.data === "updated") {
            setCount(count + 1);
        }

    }
    
    const decreaseQty = async (data) => {
        let newAmnt = {
            id: data[0],
            amount: data[1] - 1
        }
        if (newAmnt.amount > 0) {
            let res = await foodService.updateAmnt(newAmnt);
            if (res.data === "updated") {
                setCount(count + 1);
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
                                <tr>
                                    <td></td>
                                    <td>QTY: {food.amount}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="delete-form">
                            <button onClick={() => deleteFood(food._id)} name="delete-btn" className="delete-btn btn btn-outline-danger">Delete</button>
                            <button onClick={() => increaseQty([food._id, food.amount])} name="increase-btn" className="increase-btn btn btn-outline-primary">+</button>
                            <button onClick={() => decreaseQty([food._id, food.amount])} name="subtract-btn" className="subtract-btn btn btn-outline-primary">-</button>
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