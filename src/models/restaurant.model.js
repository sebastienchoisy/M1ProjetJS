export class Restaurant {
    constructor(name, building, coord, street, zipcode, cuisine,borough) {
        this.name = name;
        this.address = [building,coord,street,zipcode];
        this.cuisine = cuisine;
        this.borough = borough;
    }
}
