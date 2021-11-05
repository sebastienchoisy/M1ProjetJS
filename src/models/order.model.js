export class Order {
    constructor(restaurantName, customerName, date, items, totalCost) {
        this.restaurantName = restaurantName;
        this.customerName = customerName;
        this.date = date;
        this.items = items;
        this.totalCost = totalCost;
    }
}
