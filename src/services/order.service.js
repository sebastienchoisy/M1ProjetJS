import {authHeader} from "@/helpers/authHeader";
const API_URL = 'http://localhost:8080/api/orders/';

class OrderService {

    getOrdersForUser(username) {
        return fetch(API_URL+'details/'+username, {
            headers: authHeader(),
        }).then((response)=> response.json())
            .then((orders) => orders)
            .catch(function (err) {
                console.log(err)
            })
    }

    sendOrder(order) {
        return fetch(API_URL+'register', {
            method: "POST",
            body: JSON.stringify(order),
            headers: authHeader(),
        })
            .then((response) => response.json())
            .then((resp)=>console.log(resp))
            .catch(function (err) {
                console.log(err)
            })
    }

}

export default new OrderService();