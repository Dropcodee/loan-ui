import Vue from 'vue'
import App from './App'

// BootstrapVue add
import BootstrapVue from 'bootstrap-vue'
// Router & Store add
import router from './router'
import store from './store'
import Nprogress from 'nprogress'
// Multi Language Add
import en from './locales/en.json'
import es from './locales/es.json'
import VueI18n from 'vue-i18n'
import {
    defaultLocale,
    localeOptions
} from './constants/config'
// Notification Component Add
import Notifications from './components/Common/Notification'
// Breadcrumb Component Add
import Breadcrumb from './components/Common/Breadcrumb'
// RefreshButton Component Add
import RefreshButton from './components/Common/RefreshButton'
// Colxx Component Add
import Colxx from './components/Common/Colxx'
// Perfect Scrollbar Add
import vuePerfectScrollbar from 'vue-perfect-scrollbar'
import contentmenu from 'v-contextmenu'
import VueLineClamp from 'vue-line-clamp'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import VueScrollTo from 'vue-scrollto'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import '@/assets/css/tailwind.css'
import moment from "moment";
import Multiselect from 'vue-multiselect'
Vue.use(Vuelidate)


Vue.use(BootstrapVue);
Vue.use(VueI18n);
Vue.use(Nprogress)
const messages = {
    en: en,
    es: es
};
const locale = (localStorage.getItem('currentLanguage') && localeOptions.filter(x => x.id === localStorage.getItem('currentLanguage')).length > 0) ? localStorage.getItem('currentLanguage') : defaultLocale;
const i18n = new VueI18n({
    locale: locale,
    fallbackLocale: 'en',
    messages
});

Vue.use(Notifications);
Vue.component('piaf-breadcrumb', Breadcrumb);
Vue.component('b-refresh-button', RefreshButton);
Vue.component('b-colxx', Colxx);
Vue.component('vue-perfect-scrollbar', vuePerfectScrollbar);
Vue.use(require('vue-shortkey'));
Vue.use(contentmenu);
Vue.use(VueLineClamp, {
    importCss: true
})
Vue.use(VCalendar, {
    firstDayOfWeek: 2, // ...other defaults,
    formats: {
        title: 'MMM YY',
        weekdays: 'WW',
        navMonths: 'MMMM',
        input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
        dayPopover: 'L'
    },
    datePickerShowDayPopover: false,
    popoverExpanded: true,
    popoverDirection: 'bottom'
});
Vue.use(VueScrollTo);
Vue.component('multiselect', Multiselect),
    Vue.filter('toCurrency', function(value) {
        if (typeof value !== "number") {
            return value;
        }
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        });
        return formatter.format(value);
    });
Vue.filter('moment', function(date) {
    return moment(date).format('MMMM Do YYYY');
})


Vue.config.productionTip = false

export default new Vue({
    i18n,
    router,
    store,
    created() {
        // fetch user details from localstorage
        //  just incase user refreshes page without logout
        const userString = localStorage.getItem('user')
        if (userString && userString !== 'undefined') {
            // change localstorage string to json
            const userData = JSON.parse(userString)
            this.$store.commit('user/SET_USER_STATE', userData)
        }
        axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response.status === 401) {
                    this.$store.dispatch('user/LogoutUser')
                }
                return Promise.reject(error)
            }
        )
    },
    render: h => h(App)
}).$mount('#app')