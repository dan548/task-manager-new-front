import * as types from './mutationTypes'
import {deleteRequest, get, patch, post} from '../../../fetcher/fetcher'

export default {
    createTask({ commit }, text) {
        commit(types.CREATE_TASK_REQUEST);
        post('http://eisetasks.it/api/tasks', {
            "text": text
        })
            .then(response => {
                // eslint-disable-next-line no-console
                console.log(response);
                commit(types.CREATE_TASK_SUCCESS, response.headers.get('Location'));
            })
            .catch(error => {
                commit(types.CREATE_TASK_FAIL, error);
            })
    },
    getList({ commit }) {
        commit(types.GET_LIST_REQUEST);
        get('http://eisetasks.it/api/tasks')
            .then(response => response ? (response.tasks || []) : response)
            .then((list) => {
                commit(types.GET_LIST_SUCCESS, list);
            })
            .catch(error => {
                commit(types.GET_LIST_FAIL, error);
            })
    },
    deleteTask({ commit }, id) {
        commit(types.DELETE_TASK_REQUEST);
        deleteRequest(`http://eisetasks.it/api/tasks/${id}`)
            .then(() => {
                commit(types.DELETE_TASK_SUCCESS, id);
            })
            .catch((error) => {
                commit(types.DELETE_TASK_FAIL, error);
            })
    },
    markTaskDone( {commit}, id) {
        commit(types.MARK_TASK_DONE_REQUEST);
        patch(`http://eisetasks.it/api/tasks/${id}`, {"status" : "done"})
            .then(() => {
                commit(types.MARK_TASK_DONE_SUCCESS, id);
            })
            .catch((error) => {
                commit(types.MARK_TASK_DONE_FAIL, error);
            })
    },
    startEditing( { commit }, id, text) {
        commit(types.EDIT_TASK, id, text);
    },
    submitTask({ commit }, payload) {
        const {id, value} = payload;
        patch(`http://eisetasks.it/api/tasks/${id}`, {"text" : value})
            .then(() => {
                commit(types.SUBMIT_TASK_SUCCESS);
            })
            .catch((error) => {
                commit(types.SUBMIT_TASK_FAIL, error);
            })
    },
    submitTaskNoPatch({commit}) {
        commit(types.SUBMIT_TASK_SUCCESS);
    },
    getTask({commit}, location) {
        commit(types.GET_TASK_REQUEST);
        get(`http://eisetasks.it/api${location}`)
            .then(response => {
                commit(types.GET_TASK_SUCCESS, response);
            })
            .catch(error => {
                commit(types.GET_TASK_FAIL, error);
            })
    }
}