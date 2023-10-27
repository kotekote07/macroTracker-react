import FoodDataService from "./food";
const foodService = new FoodDataService();
class Helper {
    userCheck() {
        if (localStorage.getItem("user") === null) {
            window.location = "/login"
        }
    }

    quickLogin() {
        if (localStorage.getItem("user") !== null) {
            let data = {
                username: localStorage.getItem("user")
            }
            let confirm = foodService.quickLogin(data)
            if (confirm.data !== "") {
                window.location = "/foods"
            }
        }
    }
}

export default Helper;