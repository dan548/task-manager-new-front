import actions from './actions';
import mutations from "./mutations";

const state = {
    authorized: !!localStorage.getItem('jwt'),
    error: null,
    username: 'Johny',
    processing: false
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}