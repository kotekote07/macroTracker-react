import React from "react";
import scale from "../../img/weighing-machine.png"
import fork from "../../img/fork.png"
import past from "../../img/past.png"

import Footer from "../Footer/footer";

import "./styles.css"

const Button = () => {

    const weight = () => {
        window.location = "/weight";
    }
    const addFood = () => {
        window.location = "/addFood";
    }
    const prevFood = () => {
        window.location = "/previous-foods";
    }

    function buttonAnimation() {
        let add = document.getElementById("add-button");
        let footer = document.getElementById("footer");
        let button = document.getElementById("button-list");
        
        if (button.classList.contains("animate__fadeInUp")) {
            button.classList.remove('animate__fadeInUp')
            button.classList.add('animate__fadeOutDown')

            add.classList.remove("animate__fadeOut")
            add.classList.add('animate__fadeIn')
            
            footer.classList.remove('animate__fadeOut')
            footer.classList.add('animate__fadeIn')
        } else {
            button.style.display = "block"
            button.classList.remove('animate__fadeOutDown');
            button.classList.add('animate__fadeInUp');

            add.classList.remove('animate__fadeIn')
            add.classList.add('animate__fadeOut')

            footer.classList.remove('animate__fadeIn')
            footer.classList.add('animate__fadeOut')
        }
    }

    return (
        <div className="add-button">
            <button onClick={buttonAnimation} id="add-button" className="btn btn-light animate__animated animate__faster">+</button>
            <div id="button-list" className="new-buttons animate__animated">
                <button onClick={weight} className="btn btn-light"><img className="img-button" src={scale} alt="" /></button>
                <button onClick={addFood} className="btn btn-light"><img className="img-button" src={fork} alt="" /></button>
                <button onClick={prevFood} className="btn btn-light"><img className="img-button" src={past} alt="" /></button>
                <div className="close-button">
                    <button onClick={buttonAnimation} id="close" className="btn btn-light">X</button>
                </div>
            </div>
        <Footer />
        </div>
    )
}

export default Button