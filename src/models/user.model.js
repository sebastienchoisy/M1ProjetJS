export class User {
    constructor(username,name,lastname,phoneNumber,address,email,password,role,token,restaurants) {
        this.username = username;
        this.name = name;
        this.lastname = lastname;
        this.phoneNumber= phoneNumber;
        this.address = address;
        this.email = email;
        this.password = password;
        this.role = role;
        this.token = token;
        this.restaurants = restaurants;
    }
}
