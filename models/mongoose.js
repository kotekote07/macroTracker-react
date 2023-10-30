import mongoose from "mongoose";

const foodSchema = {
    name: String,
    calories: Number,
    carbs: Number,
    fats: Number,
    proteins: Number,
    user: String,
    date: Date,
    amount: Number
};

const PrevFoodSchema = {
    name: String,
    calories: Number,
    carbs: Number,
    fats: Number,
    proteins: Number,
    user: String,
    date: Date
};

const userSchema = {
    username: String,
    password: String,
};

export const Food = mongoose.model("Food", foodSchema);
export const PrevFood = mongoose.model("PrevFood", PrevFoodSchema);
export const User = mongoose.model("User", userSchema);