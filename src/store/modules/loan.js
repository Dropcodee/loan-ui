import LoanServices from "@/services/LoanServices";
import router from "../../router";
export const namespaced = true;

export const state = {
  userLoans: null,
  processing: false,
  potentialGuarantors: []
};

export const mutations = {
  SET_REQUEST_PROCESS(state, requestProcess) {
    state.processing = requestProcess;
  },
  STORE_USER_LOANS(state, loanData) {
    state.loans = loanData;
  },
  STORE_POTENTIAL_GUARANTORS(state, guarantors) {
    state.potentialGuarantors = guarantors;
  }
};

export const actions = {
  async CommodityLoanRequest({ commit, dispatch }, payload) {
    let response;
    try {
      commit("SET_REQUEST_PROCESS", true);
      response = await LoanServices.commodity(payload);
      commit("SET_REQUEST_PROCESS", false);
      const notification = {
        type: "success",
        message:
          "Successfully applied for a new loan, we will contact you shortly."
      };
      dispatch("notification/add", notification, {
        root: true
      });
      router.push({
        name: "loan-monitor"
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
  async CreditLoanRequest({ commit, dispatch }, payload) {
    let response;
    try {
      commit("SET_REQUEST_PROCESS", true);
      response = await LoanServices.creditloan(payload);
      commit("SET_REQUEST_PROCESS", false);
      console.log(response);
      const notification = {
        type: "success",
        message:
          "Successfully applied for a new loan, we will contact you shortly."
      };
      dispatch("notification/add", notification, {
        root: true
      });
      router.push({
        name: "loan-monitor"
      });
    } catch (error) {
      commit("SET_REQUEST_PROCESS", false);
      console.log(error);
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
      throw error;
    }
    const notification = {
      type: "error",
      message: "server error, please try again later"
    };
    dispatch("notification/add", notification, {
      root: true
    });
    throw ex;
  },
  async CarAcquisitionRequest({ commit, dispatch }, payload) {
    let response;
    try {
      commit("SET_REQUEST_PROCESS", true);
      response = await LoanServices.carloan(payload);
      commit("SET_REQUEST_PROCESS", false);
      const notification = {
        type: "success",
        message:
          "Successfully applied for a new loan, we will contact you shortly."
      };
      dispatch("notification/add", notification, {
        root: true
      });
      router.push({
        name: "loan-monitor"
      });
    } catch (ex) {
      commit("SET_REQUEST_PROCESS", false);
      if (ex.response.status === 500 || ex.response.status === 401) {
        if (ex.response.data.errors) {
          let errors = ex.response.data.errors;
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
        } else if (ex.response.data.error) {
          const notification = {
            type: "error",
            message: ex.response.data.error
          };
          dispatch("notification/add", notification, {
            root: true
          });
        }
      }
    }
  },
  async FetchGuarantors({ commit, dispatch }) {
    commit("SET_REQUEST_PROCESS", true);
    try {
      // fetch guarantors
      const response = await LoanServices.guarantors();
      commit("SET_REQUEST_PROCESS", false);
      // save potential guarantors
      // console.log(response.data)
      commit("STORE_POTENTIAL_GUARANTORS", response.data.guarantors);
    } catch (err) {
      commit("SET_REQUEST_PROCESS", false);
    }
  }
};
export const getters = {
  processing(state) {
    return state.processing;
  },
  potentialGuarantors(state) {
    return state.potentialGuarantors;
  }
};
