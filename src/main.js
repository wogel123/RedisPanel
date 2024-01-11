import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted'
import moment from 'moment'
import lodash from 'lodash'

Vue.config.productionTip = true;

Vue.use(Toasted, {
  iconPack: "fontawesome",
  router
});
moment.locale('fr')
Vue.prototype.$lodash = lodash;

let app;

const initialize = () => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
};

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user);
    store.dispatch('fetchUserProfile')
  }
  initialize()
});