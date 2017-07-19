import Vue from 'vue'
import App from './App.vue'

import InfiniteScroll from './install';

Vue.use(InfiniteScroll);

new Vue({
    el: '#app',
    render: h => h(App)
});
