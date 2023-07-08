import axios from "axios";

export default axios.create({
    baseURL: "https://murmuring-citadel-90338-42ba0518069d.herokuapp.com",
    headers: {
        "Content-type": "application/json"
    }
});