import App from "./modules/app";
//import VueApp from "./modules/vue-test";

const app = new App();

import Vue from 'vue';

var VueApp = new Vue({
    el: '#app',
    data: {
        message: 'Vue is available!'
    }
});