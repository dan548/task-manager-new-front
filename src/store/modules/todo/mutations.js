import * as types from './mutationTypes'

export default {
    [types.GET_LIST_REQUEST] (state) {
        state.taskList = [];
        state.error = null;
        state.isList = false;
        state.taskId = '';
        state.isEditing = false;
        state.cacheText = '';
    },
    [types.GET_LIST_SUCCESS] (state, taskList) {
        state.taskList = taskList;
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
    [types.CREATE_TASK_REQUEST] (state) {
        state.taskLocation = null;
        state.error = null;
    },
    [types.CREATE_TASK_SUCCESS] (state, location) {
        state.taskLocation = location;
    },
    [types.CREATE_TASK_FAIL] (state, error) {
        state.error = error;
    },
    [types.EDIT_TASK] (state, id, text) {
        state.error = null;
        state.taskId = id;
        state.cacheText = text;
        state.isEditing = true;
    },
    [types.SUBMIT_TASK_SUCCESS] (state) {
        state.isEditing = false;
    },
    [types.SUBMIT_TASK_FAIL] (state, error) {
        state.isEditing = false;
        state.error = error;
    },
    [types.MARK_TASK_DONE_REQUEST] (state) {
        state.error = null;
    },
    [types.MARK_TASK_DONE_SUCCESS] (state, id) {
        state.commit(types.DELETE_TASK_SUCCESS, id);
    },
    [types.MARK_TASK_DONE_FAIL] (state, error) {
        state.error = error;
    },
    [types.GET_TASK_REQUEST] (state) {
        state.error = null;
        state.taskLocation = null;
    },
    [types.GET_TASK_SUCCESS] (state, task) {
        if (state.taskList.length > 24) {
            state.isList = false;
        } else {
            state.taskList.unshift(task);
        }
    },
    [types.GET_TASK_FAIL] (state, error) {
        state.error = error;
    }
}