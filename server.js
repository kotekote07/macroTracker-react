import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

import { config } from "dotenv";
config();

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import { Food, PrevFood ,User } from "./models/mongoose.js";

// mongoose connection
try {
    mongoose.connect(process.env.mongo_pw);
} catch (error) {
    console.error(error);
}

let currentUser = null;
let currentName = null;

// express

const app = express();

app.use(express.static(path.join(__dirname, "client", "build")))

app.use(cors());
app.use(express.json());

app.route("/user")
    .get((req, res) => {
        res.send(currentName);
    });

app.route("/login")
    .post((req, res) => {
        User.findOne({username: req.body.username, password: req.body.password}).then((users) => {
            if (users) {
                currentUser = users.id;
                currentName = users.username;
                res.send(currentUser)
            }
            else {
                res.send(null)
            }
        })  
    })

app.get("/logout", (req, res) => {
    currentUser = null;
    currentName = null;
})

app.route("/food")
    .get((req, res) => {
        Food.find({user: currentUser}).then((foods) => {
            if (foods) {
                res.send(foods);
            }
        })
    })
    .post((req, res) => {
        const {name, carbs, fats, proteins} = req.body;
        let calories = ((carbs * 4) + (proteins * 4) + (fats * 9));
        let currentDate = new Date();
        const food = new Food({
            name: name,
            calories: calories,
            carbs: carbs,
            fats: fats, 
            proteins: proteins, 
            user: currentUser,
            date: currentDate
        });

        const prevFood = new PrevFood({
            name: name,
            calories: calories,
            carbs: carbs,
            fats: fats, 
            proteins: proteins, 
            user: currentUser,
            date: currentDate
        });

        try {
            food.save();
            prevFood.save()
        } catch (error) {
            console.log("food was unable to be added" + error);
        }
    })

app.post("/deleteFood", (req, res) => {
        const foodId = req.body.id;
        Food.findByIdAndRemove(foodId).then((err) => {
            console.log("deleted " + foodId)
        })
    });

app.get("/foodTotals", async (req, res) => {
    res.send(await getCals())
})

app.route("/previous-food")
    .get((req, res) => {
        PrevFood.find({}).then((food) => {
            res.send(food)
        })
    })
    .post((req, res) => {
        const foodId = req.body.id;
        PrevFood.findByIdAndRemove(foodId).then((err) => {
            console.log("deleted " + foodId);
        })
    })

app.post("/add-from-previous", (req, res) => {
    const {name, carbs, fats, proteins} = req.body;
    let calories = ((carbs * 4) + (proteins * 4) + (fats * 9));
    let currentDate = new Date();
    const food = new Food({
        name: name,
        calories: calories,
        carbs: carbs,
        fats: fats, 
        proteins: proteins, 
        user: currentUser,
        date: currentDate
    });

    try {
        food.save();
    } catch (error) {
        console.log("food was unable to be added" + error);
    }
})

async function getCals() {
    let totCalories = 0, totCarbs = 0, totFats = 0, totProteins = 0;
    let foods = await Food.find({user: currentUser});
    foods.forEach((food) => {
        totCalories += food.calories
        totCarbs += food.carbs
        totFats += food.fats
        totProteins += food.proteins
    })
    return {totCalories, totCarbs, totFats, totProteins}
}

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

const port = process.env.PORT || 8000;
    
app.listen(port, () => {
    console.log(`server started on ${port}`);
})