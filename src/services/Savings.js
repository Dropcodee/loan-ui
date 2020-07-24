import api from "@/services/Api";

export default {
  getSavings() {
    return api().get("savings");
  },
  createSavings(credentials) {
    return api().post("savings/create", credentials);
  },
  paySavings(credentials) {
    return api().post("savings/pay", credentials);
  },
  update(credentials) {
    return api().get("savings/edit", credentials);
  }
};
