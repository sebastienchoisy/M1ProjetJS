import OrderService from '../services/order.service';


export const order = {
    namespaced: true,
    state: {orders:['k']},
    actions: {
        getOrders({ commit },username) {
            return OrderService.getOrdersForUser(username).then(
                orders => { orders.forEach((order)=>order.date = (new Date(order.date)).toLocaleDateString());
                    commit('ordersSuccess', orders);
                    return Promise.resolve(orders);
                },
                error => {
                    commit('ordersFailure');
                    return Promise.reject(error);
                }
            );
        },
        cleanOrders({commit}){
            commit('cleaningOrdersSuccess');
        },
        sendOrder({commit},order){
            return OrderService.sendOrder(order).then(()=>{
                order.date = (new Date(order.date)).toLocaleDateString();
                commit('orderAddSuccess',order);
            })

        }
    },
    mutations: {
        ordersSuccess(state, orders) {
            state.orders = orders;
        },
        cleaningOrdersSuccess(state) {
            state.orders = [];
        },
        orderAddSuccess(state,order) {
            state.orders.push(order);
        }
    }
};