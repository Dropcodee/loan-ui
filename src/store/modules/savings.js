import Savings from "@/services/Savings";
import router from "../../router";
export const namespaced = true;

export const state = {
  userSavings: null,
  processing: false,
  savingsUpdateToken: null
};

export const getters = {
  processing(state) {
    return state.processing;
  },
  getUser(state) {
    // console.log(state.userSavings);
    return state.userSavings || null;
  }
};

export const mutations = {
  SET_USER_SAVINGS(state, savingsData) {
    state.userSavings = savingsData;
  },
  SET_REQUEST_PROCESS(state, requestProcess) {
    state.processing = requestProcess;
  },
  SET_UPDATE_TOKEN(state, savingsData) {
    state.savingsUpdateToken = savingsData.code;
  },
  CREATE_TRANSACTION(state, transaction) {
    let trans = JSON.parse(localStorage.getItem("Transactions") || "[]");
    trans.push(transaction);
    localStorage.setItem("Transactions", JSON.stringify(trans));
  }
};

export const actions = {
  async getSavings({ commit, dispatch }) {
    commit("SET_REQUEST_PROCESS", true);
    let response;
    try {
      response = await Savings.getSavings();
      commit("SET_REQUEST_PROCESS", false);
      commit("SET_USER_SAVINGS", response.data);
    } catch (error) {
      commit("SET_REQUEST_PROCESS", false);
      // console.log(error);
    }
  },
  async createSavings({ commit, dispatch }, payload) {
    let response;
    try {
      commit("SET_REQUEST_PROCESS", true);
      response = await Savings.createSavings(payload);
      commit("SET_REQUEST_PROCESS", false);
      const notification = {
        type: "success",
        message: "Successfully applied for a savings account."
      };
      router.push({
        name: "savings-payment"
      });
      dispatch("notification/add", notification, {
        root: true
      });
    } catch (error) {
      commit("SET_REQUEST_PROCESS", false);
      if (error.response.status === 500 || error.response.status === 401) {
        if (error.response.data.errors) {
          let errors = error.response.data.errors;
          errors.forEach(function(error) {
            // statements
            const notification = {
              type: "error",
              message: error
            };
            dispatch("notification/add", notification, {
              root: true
            });
          });
        } else if (error.response.data.error) {
          const notification = {
            type: "error",
            message: error.response.data.error
          };
          dispatch("notification/add", notification, {
            root: true
          });
        }
      }
      const notification = {
        type: "error",
        message: "server error, please try again later"
      };
      dispatch("notification/add", notification, {
        root: true
      });
      throw ex;
    }
  },
  async createTransaction({ commit, dispatch }, payload) {
    let response;
    try {
      commit("SET_REQUEST_PROCESS", true);
      response = await Savings.paySavings(payload);
      commit("CREATE_TRANSACTION", payload);
      commit("SET_REQUEST_PROCESS", false);
      const notification = {
        type: "success",
        message: "Successfully made monthly deposit"
      };
      dispatch("notification/add", notification, {
        root: true
      });
    } catch (error) {
      commit("SET_REQUEST_PROCESS", false);
      if (error.response.status === 500 || error.response.status === 401) {
        if (error.response.data.errors) {
          let errors = error.response.data.errors;
          errors.forEach(function(error) {
            // statements
            const notification = {
              type: "error",
              message: error
            };
            dispatch("notification/add", notification, {
              root: true
            });
          });
        } else if (error.response.data.error) {
          const notification = {
            type: "error",
            message: error.response.data.error
          };
          dispatch("notification/add", notification, {
            root: true
          });
        }
      }
      const notification = {
        type: "error",
        message: "server error, please try again later"
      };
      dispatch("notification/add", notification, {
        root: true
      });
      throw ex;
    }
  },
  async GenerateSavingsToken({ commit, dispatch }, payload) {
    commit("SET_REQUEST_PROCESS", true);
    try {
      const response = await Savings.update(payload);
      // create success notification
      // console.log(response.data)
      // update user state with new data
      commit("SET_REQUEST_PROCESS", false);
      const notification = {
        type: "success",
        message: response.data.message
      };
      dispatch("notification/add", notification, {
        root: true
      });
      commit("SET_UPDATE_TOKEN", response.data);
    } catch (err) {
      commit("SET_REQUEST_PROCESS", false);
      if (err.response.status === 500 || err.response.status === 401) {
        const notification = {
          type: err.response.data.status,
          message: err.response.data.message
        };
        dispatch("notification/add", notification, {
          root: true
        });
      }
      throw err;
    }
  }
};
