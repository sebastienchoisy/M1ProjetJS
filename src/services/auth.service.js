
const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
    login(user) {
        return fetch(API_URL+'login', {
            method: "POST",
            body: JSON.stringify({"username":user.username,"password":user.password}),
            headers: new Headers({'content-type': 'application/json'})
        }).then((response)=> response.json())
            .then((user) => {
                localStorage.setItem('user',JSON.stringify(user));
                return user;
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

    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();