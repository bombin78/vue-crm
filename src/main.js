import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import messagePlagin from '@/utils/message.plugin.js'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import {firebaseConfig} from "@/configs/firebaseConfig";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(messagePlagin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);

console.log('firebaseConfig', firebaseConfig);

firebase.initializeApp(firebaseConfig);

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
