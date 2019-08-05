import * as types from './mutationTypes';

export default {
    [types.GET_LIST_REQUEST] (state) {
        state.taskList = [];
        state.error = null;
        state.isList = false;
    },
    [types.GET_LIST_SUCCESS] (state, taskList) {
        state.taskList = taskList;
        state.error = null;
        state.isList = true;
    },
    [types.GET_LIST_FAIL] (state, error) {
        state.error = error;
    },
    [types.DELETE_TASK_REQUEST] (state) {
        state.error = null;
    },
    [types.DELETE_TASK_SUCCESS] (state, id) {
        state.taskList = state.taskList.filter(task => task.id !== id);
    },
    [types.DELETE_TASK_FAIL] (state, error) {
        state.error = error;
    },
    [types.TASK_DONE] (state, task) {
        state.taskList = [task, ...state.taskList];
    }
}