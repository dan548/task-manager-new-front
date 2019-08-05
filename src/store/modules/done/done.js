import actions from './actions';
import mutations from "./mutations";

const state = {
    taskList: [],
    error: null,
    isList: false
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}