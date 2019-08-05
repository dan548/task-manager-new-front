import { post, get } from '../../../fetcher/fetcher';

import * as types from './mutationTypes';

export default {
    signIn({ commit }, credentials) {
        commit(types.SIGN_IN_REQUEST);
        post('http://eisetasks.it/api/signin', credentials)
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('jwt', data.token);
                commit(types.SIGN_IN_SUCCESS);
            })
            .catch(error => {
                commit(types.SIGN_IN_FAIL, error)
            })
    },
    signUp({ dispatch, commit }, credentials) {
        commit(types.SIGN_UP_REQUEST);
        post('http://eisetasks.it/api/signup', credentials)
            .then(() => {
                commit(types.SIGN_UP_SUCCESS);
                dispatch('signIn', credentials);
            })
            .catch(error => {
                commit(types.SIGN_UP_FAIL, error)
            })
    },
    whoAmI({ commit }) {
        commit(types.WHOAMI_REQUEST);
        get('http://eisetasks.it/api/whoami')
            .then(response => {
                // eslint-disable-next-line no-console
                console.log(response);
                commit(types.WHOAMI_SUCCESS, response.username);
            })
            .catch(error => {
                localStorage.removeItem('jwt');
                commit(types.WHOAMI_FAIL, error);
            });
    }
}