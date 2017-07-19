import InfiniteScroll from './InfiniteScroll.vue';


export default {
    install: function (Vue, options) {
        Vue.component('infinite-scroll', InfiniteScroll);
    }
}