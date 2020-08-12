import axios from "axios";
import AuthenticationService from "@/services/AuthenticationService";
import router from "../../router";
export const namespaced = true;

export const state = {
    user: null,
    processing: false,
    updateToken: null
};

export const mutations = {
    SET_USER_STATE(state, userData) {
        state.user = userData.user;
        localStorage.setItem("user", JSON.stringify(userData.user));
        axios.defaults.headers.common[
            "Authorization"
        ] = ` Bearer ${userData.user.api_token}`;
    },
    SET_UPDATE_TOKEN(state, userData) {
        state.updateToken = userData.code
    },
    LOGOUT_USER(state) {
        localStorage.removeItem("user");
        axios.defaults.headers.common["Authorization"] = null;
        location.reload();
    },
    SET_REQUEST_PROCESS(state, requestProcess) {
        state.processing = requestProcess;
    },
};

export const actions = {
    async RegisterUser({
        commit,
        dispatch
    }, payload) {
        commit("SET_REQUEST_PROCESS", true);
        try {
            const response = await AuthenticationService.register(payload);
            // console.log(response.data)
            commit("SET_REQUEST_PROCESS", false);
            // commit('SET_USER_STATE', response.data.data)
            // create success notification
            const notification = {
                type: "success",
                message: response.data.message,
            };
            dispatch("notification/add", notification, {
                root: true
            });
            router.push({
              name: "Login"
            });
        } catch (err) {
            commit("SET_REQUEST_PROCESS", false);
            // console.log(err.response.data.message)
            if (err) {
                const notification = {
                    type: "error",
                    message: err.response.data.message,
                };
                // dispatch notification action for creating notifications
                dispatch("notification/add", notification, {
                    root: true
                });
                throw err;
            } else {
                const notification = {
                    type: "error",
                    message: "Server Error, please try again later",
                };
                // dispatch notification action for creating notifications
                dispatch("notification/add", notification, {
                    root: true
                });
                throw err;
            }
        }
    },
    async LoginUser({
        commit,
        dispatch
    }, payload) {
        // send request to server
        try {
            commit("SET_REQUEST_PROCESS", true);
            const response = await AuthenticationService.login(payload);
            // store user return data
            // console.log(response.data);
            commit("SET_USER_STATE", response.data);
            // create success notification
            const notification = {
                type: "success",
                message: "Welcome Back, please be patient as we load your account...",
            };
            dispatch("notification/add", notification, {
                root: true
            });
            commit("SET_REQUEST_PROCESS", false);
            router.push({
                name: "dashboard"
            });
        } catch (err) {
            commit("SET_REQUEST_PROCESS", false);
            // console.log(err.response.data)
            if (err) {
                if (err.response.status == '500') {
                    const notification = {
                        type: "error",
                        message: "Server Error, Please try again",
                    };
                    // dispatch notification action for creating notifications
                    dispatch("notification/add", notification, {
                        root: true
                    });
                    throw err;
                } else {
                    const notification = {
                        type: "error",
                        message: err.response.data.message,
                    };
                    // dispatch notification action for creating notifications
                    dispatch("notification/add", notification, {
                        root: true
                    });
                    throw err;
                }

            } else {
                const notification = {
                    type: "error",
                    message: "Server error, please try again later",
                };
                // dispatch notification action for creating notifications
                dispatch("notification/add", notification, {
                    root: true
                });
                throw err;
            }
        }
    },
    LogoutUser({
        commit,
        dispatch,
        state
    }) {

        commit("LOGOUT_USER");
    },
    async GenerateToken({
        commit,
        dispatch
    }, payload) {
        commit("SET_REQUEST_PROCESS", true);
        try {
            const response = await AuthenticationService.update(payload);
            // create success notification
            // console.log(response.data)
            // update user state with new data
            commit("SET_REQUEST_PROCESS", false);
            const notification = {
                type: "success",
                message: response.data.message,
            };
            dispatch("notification/add", notification, {
                root: true
            });
            commit('SET_UPDATE_TOKEN', response.data)
        } catch (err) {
            commit("SET_REQUEST_PROCESS", false);
            if (err.response.status === 500 || err.response.status === 401) {
                const notification = {
                    type: err.response.data.status,
                    message: err.response.data.message,
                };
                dispatch("notification/add", notification, {
                    root: true
                });
            }
            throw err
        }
    }
};
export const getters = {
    isLoggedIn(state) {
        return !!state.user;
    },
    currentUser(state) {
        if (state.user !== null || state.user !== undefined) {
            return state.user;
        }
        return null;
    },
    processing(state) {
        return state.processing;
    },
};