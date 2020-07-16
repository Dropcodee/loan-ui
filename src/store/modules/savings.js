import LoanServices from "@/services/LoanServices";
import router from "../../router";
export const namespaced = true;

export const state = {
  userSavings: null,
  processing: false
};

export const getters = {
  getSavings(state) {
    return state.userSavings || null;
  }
};

export const mutations = {
  SET_USER_SAVINGS(state, savingsData) {
    state.userSavings = savingsData;
    var transaction = JSON.parse(localStorage.getItem("Transactions") || "[]");
    transaction.push(
      Object.assign(response, {
        user_id: this.currentUser.id,
        amount: this.amount / 100
      })
    );
    localStorage.setItem("Transactions", JSON.stringify(transaction));
  },
  SET_REQUEST_PROCESS(state, requestProcess) {
    state.processing = requestProcess;
  }
};

export const actions = {
  async createSavings({ commit, dispatch }, payload) {
    let response;
    try {
      commit("SET_REQUEST_PROCESS", true);
      response = await LoanServices.savings(payload);
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
};
