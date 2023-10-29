import Cookies from 'universal-cookie';

import FoodDataService from "./food";
const foodService = new FoodDataService();
const cookies = new Cookies();

class Helper {
    userCheck() {
        console.log(cookies.get('user'))
        if (cookies.get("user") === undefined) {
            window.location = "/login"
        }
    }

    quickLogin() {
        if (cookies.get("user") !== undefined) {
            let data = {
                username: cookies.get("user")
            }
            let confirm = foodService.quickLogin(data)
            if (confirm.data !== "") {
                window.location = "/foods"
            }
        }
    }
}

export default Helper;