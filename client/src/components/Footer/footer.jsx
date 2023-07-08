import React, { useEffect, useState } from "react";

import FoodDataService from "../../services/food";

import "./styles.css";

const Footer = () => {

    const foodService = new FoodDataService();

    const [totalFoods, setFoods] = useState([]);

    useEffect(() => {
        totals();
    })

    async function totals() {
        const res = await foodService.getTotals();
        setFoods(res.data);

    }

    return (
        <div id="footer" className="footer animate__animated animate__faster">
            <div>
                <div className="cal-footer">
                    <p>total Calories</p>
                    <p>{totalFoods.totCalories}</p>
                </div>
                <div className="footer-info">
                    <p>carbs</p>
                    <p>{totalFoods.totCarbs}</p>
                    <p>fats</p>
                    <p>{totalFoods.totFats}</p>
                    <p id="prot-footer">proteins</p>
                    <p>{totalFoods.totProteins}</p>
                </div>
            </div>  
        </div>
    )
}

export default Footer;