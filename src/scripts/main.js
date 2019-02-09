import App from "./modules/app";
const app = new App();

import Vue from 'vue';
var VueApp = new Vue({
    el: '#app',
    data: {
        message: 'Vue is available!'
    }
});

import "../components/info/info.js";