import OrderService from '../services/order.service';


export const order = {
    namespaced: true,
    state: {orders:null},
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
        }
    },
    mutations: {
        ordersSuccess(state, orders) {
            state.orders = orders;
        },
        cleaningOrdersSuccess(state) {
            state.orders = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user= null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    }
};