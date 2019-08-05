import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import user from './modules/user/user';
import todo from './modules/todo/todo';
import done from './modules/done/done';

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        user, todo, done
    },
    strict: debug
})