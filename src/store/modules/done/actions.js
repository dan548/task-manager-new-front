import * as types from './mutationTypes'
import {deleteRequest, get} from '../../../fetcher/fetcher'

export default {
    getList({ commit }) {
        commit(types.GET_LIST_REQUEST);
        get('http://eisetasks.it/api/tasks?status=done')
            .then(response => {
                commit(types.GET_LIST_SUCCESS, response ? (response.tasks || []) : response);
            })
            .catch(error => {
                commit(types.GET_LIST_FAIL, error);
            })
    },
    deleteTask({ commit }, id) {
        commit(types.DELETE_TASK_REQUEST);
        deleteRequest("http://eisetasks.it/api/tasks/" + id)
            .then(() => {
                commit(types.DELETE_TASK_SUCCESS, id);
            })
            .catch((error) => {
                commit(types.DELETE_TASK_FAIL, error);
            })
    }
}