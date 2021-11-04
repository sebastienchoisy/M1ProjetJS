
const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
    login(user) {
        return fetch(API_URL + 'login', {
            method: "POST",
            body: JSON.stringify({"username":user.username,"password":user.password})
        }).then((response)=> response.json())
            .then((user) => {
                localStorage.setItem('user',JSON.stringify(user))})
            .catch(function (err) {
                console.log(err)
            })
    }

    register(user) {
        return fetch(API_URL + 'register', {
            method: "POST",
            body: JSON.stringify(user)
        })
            .then(response => {
                console.log(response)
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    logout() {
        localStorage.removeItem('user');
    }
}

export default new AuthService();