import {authHeader} from "@/helpers/authHeader";
const API_URL = 'http://localhost:8080/api/orders/';

class OrderService {
    Orders =[];

    getOrdersForUser(username) {
        return fetch(API_URL+'details/'+username, {
            headers: authHeader()
        }).then((response)=> response.json())
            .then((orders) => {
                return orders
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    register(user) {
        return fetch(API_URL+'register', {
            method: "POST",
            body: JSON.stringify(user),
            headers: new Headers({'content-type': 'application/json'})
        })
            .then((response) => response.json())
            .then((resp)=>console.log(resp))
            .catch(function (err) {
                console.log(err)
            })
    }

}

export default new OrderService();