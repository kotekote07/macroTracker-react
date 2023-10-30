import http from "../http-common";

class FoodDataService {
    getAll() {
        return http.get("/food");
    }

    addFood(data) {
        return http.post("/food", data)
    }

    removeFood(id) {
        return http.post("/deleteFood", id)
    }

    getTotals() {
        return http.get("/foodTotals");
    }

    getPrevious() {
        return http.get("/previous-food");
    }

    removePrevious(id) {
        return http.post("/previous-food", id);
    }

    addFromPrevious(data) {
        return http.post("/add-from-previous", data);
    }

    getUser(data) {
        return http.post("/login", data)
    }

    getUserName() {
        return http.get("/user")
    }

    logout() {
        return http.get("/logout")
    }

    quickLogin(data) {
        return http.post("/quicklogin", data)
    }

    updateAmnt(data) {
        return http.post("update-amnt", data);
    }
}

export default FoodDataService;