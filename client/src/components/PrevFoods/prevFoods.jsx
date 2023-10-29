import React, { useEffect, useState } from "react";
import "./styles.css";

import FoodDataService from "../../services/food";

import Navbar from "../navbar";
import Helper from "../../services/helper";

function PrevFoods() {

    const foodService = new FoodDataService();

    const helper = new Helper();

    helper.userCheck();

    const [prevFoods, setPrevFoods] = useState([]);

    const [count, setCount] = useState(0);

    useEffect(() => {
        getFoods();
        // eslint-disable-next-line 
    }, [count])

    async function getFoods() {
        try {
            const res = await foodService.getPrevious();
            setPrevFoods(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteFood = async (id) => {
        let foodID = {
            id: id
        }
        let res = await foodService.removePrevious(foodID);
        if (res.data === "deleted") {
            setCount(count + 1);
        }
    }

    const addFood = async (name, carbs, fats, proteins) => {
        let data = {
            name: name,
            carbs: carbs,
            fats: fats,
            proteins: proteins
        }
        let res = await foodService.addFromPrevious(data)
        if (res.data === "added") {
            setCount(count + 1);
        }

        let message = document.getElementById("success-message");
        message.style.display = "block"
        message.classList.remove('animate__fadeOut')
        message.classList.add("animate__fadeIn")
        message.addEventListener('animationend', () => {
            message.classList.remove("animate__fadeIn")
            message.classList.add('animate__fadeOut')
        })
    }

    const selectDelete = (data) => {
        let cont = document.getElementsByName("container")
        let btn = document.getElementsByName("delete-btn");
        let addBtn = document.getElementsByName("add-btn")
        for (let num = 0; num < cont.length; num++) {
            if (cont[num].id === data) {
                if (cont[num].style.border !== "1px solid yellow") {
                    cont[num].style.border = "1px solid yellow";
                    btn[num].style.display = "inline-block"
                    addBtn[num].style.display = "inline-block"
                } else {
                    cont[num].style.border = "1px solid black";
                    btn[num].style.display = "none"
                    addBtn[num].style.display = "none"
                 }
            }
        }
    }

    return (
        <div>
            <Navbar />
            {prevFoods.map((food) => {
                return (
                    <div onClick={() => selectDelete(food._id)} key={food._id} name="container" id={food._id} className="previous-container">
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
                        <div className="button-form">
                            <button onClick={() => addFood(food.name, food.carbs, food.fats, food.proteins)} name="add-btn" className="add-btn btn btn-outline-success">Add</button>
                            <button onClick={() => deleteFood(food._id)} name="delete-btn" className="delete-btn btn btn-outline-danger">Delete</button>
                        </div>
                    </div>
                )
            })}
            <div id="success-message" className="animate__animated">
                <h4>Added food</h4>
            </div>
            <div className="prev-foods-footer">
                <h1>Previous Foods</h1>
            </div>
        </div>
    )
}

export default PrevFoods;