import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './auth.module';
import {order} from './order.module';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        order
    },
    plugins: [createPersistedState()]
});