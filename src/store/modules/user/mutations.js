import * as types from './mutationTypes'

export default {
    [types.SIGN_IN_REQUEST] (state) {
        state.processing = true;
    },
    [types.SIGN_IN_FAIL] (state, error) {
        state.processing = false;
        state.authorized = false;
        state.error = error;
    },
    [types.SIGN_IN_SUCCESS] (state) {
        state.processing = false;
        state.authorized = true;
        state.error = null;
    },
    [types.SIGN_UP_REQUEST] (state) {
        state.processing = true;
    },
    [types.SIGN_UP_FAIL] (state, error) {
        state.processing = false;
        state.error = error;
    },
    [types.SIGN_UP_SUCCESS] (state) {
        state.processing = false;
        state.error = null;
    },
    [types.WHOAMI_REQUEST] (state) {
        state.processing = true;
    },
    [types.WHOAMI_FAIL] (state, error) {
        state.processing = false;
        state.error = error;
        state.authorized = false;
    },
    [types.WHOAMI_SUCCESS] (state, username) {
        state.processing = false;
        state.error = null;
        state.username = username;
    },
    [types.FLUSH_ERROR] (state) {
        state.error = null;
    }
}