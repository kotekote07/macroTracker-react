import React, { useEffect, useState } from "react";

import FoodDataService from "../../services/food";

import "./styles.css";

const Footer = (props) => {

    const foodService = new FoodDataService();

    const [totalFoods, setFoods] = useState([]);

    useEffect(() => {
        totals();
        // eslint-disable-next-line
    }, [props.count])

    async function totals() {
        const res = await foodService.getTotals();
        setFoods(res.data);
    }

    return (
        <div id="footer" className="footer animate__animated animate__faster">
            <div className="footer-info">
                <p>{totalFoods.totCalories}</p>
                <p>{totalFoods.totCarbs}</p>
                <p>{totalFoods.totFats}</p>
                <p>{totalFoods.totProteins}</p>
            </div>  
        </div>
    )
}

export default Footer;