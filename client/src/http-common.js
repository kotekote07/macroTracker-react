import axios from "axios";

export default axios.create({
    // baseURL: "http://localhost:5000",
    // use that one for heroku
    baseURL: "https://murmuring-citadel-90338-42ba0518069d.herokuapp.com",
    headers: {
        "Content-type": "application/json"
    }
});