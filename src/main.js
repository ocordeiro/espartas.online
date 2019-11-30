import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'

Vue.config.productionTip = false

let app = '';
const config = {
  apiKey: 'AIzaSyDcL8BAAOv7tiy7KH2iDWZZTxYuboRM4sM',
  authDomain: 'espartas.firebaseapp.com',
  databaseURL: 'https://espartas.firebaseio.com',
  projectId: 'espartas',
  storageBucket: 'espartas.appspot.com',
  messagingSenderId: '364955314085'
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      render: h => h(App)
    }).$mount('#app');
  }
});