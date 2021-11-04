export class Order {
    constructor(status, restaurantName, customerName, date, items, totalCost, paymentMethod) {
        this.status = status;
        this.restaurantName = restaurantName;
        this.customerName = customerName;
        this.date = date;
        this.items = items;
        this.totalCost = totalCost;
        this.paiementMethod = paymentMethod;
    }
}
