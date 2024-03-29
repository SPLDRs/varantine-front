import Vue from 'vue';
import Vuex from 'vuex';

import { alert } from './alert.module';
import { account } from './account.module';
import { users } from './users.module';
import { houses } from './houses.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users,
        houses
    },
    state: {},
    actions: {
        socket_newLocation({commit}, position) {
            console.log(position)
        }
    },

});
