import actions from './actions';
import mutations from "./mutations";

const state = {
    taskLocation: null,
    taskList: [],
    error: null,
    isList: false,
    taskId: '',
    isEditing: false,
    cacheText: ''
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}