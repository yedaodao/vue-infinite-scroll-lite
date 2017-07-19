import InfiniteScroll from './InfiniteScroll.vue';


export default {
    install: function (Vue, options) {
        let componentName = 'infinite-scroll';
        if (options && options.namespace) {
            componentName = `${options.namespace}-componentName}`;
        }
        Vue.component(componentName, InfiniteScroll);
    }
}