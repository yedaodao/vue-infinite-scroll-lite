<template>
    <div class="visl-wrapper">
        <div class="visl-container">
            <slot name="scroll-content"></slot>
        </div>
    </div>
</template>

<script>
    const EVT_REACH_CONTAINER_BOTTOM = 'evt-reach-container-bottom';
    const EVT_REACH_SCROLL_BOTTOM = 'evt-reach-scroll-bottom';

    const defaultOptions = {
        firstCheck: false,
        bufferHeight: 10,
    };

    export default {
        name: 'InfiniteScroll',
        props: {
            option: {
                type: Object,
                default() {
                    return defaultOptions;
                },
            }
        },
        computed: {
            options() {
                return Object.assign({}, defaultOptions, this.option);
            }
        },
        data() {
            return {
                scrollContainer: null,
//                winRect: {
//                    domWidth: 0,
//                    domHeight: 0,
//                    bodyWidth: 0,
//                    bodyHeight: 0,
//                    innerWidth: 0,
//                    innerHeight: 0,
//                },
//                onResize: this.getOnResize(),
                onScroll: this.getOnScroll(),
            };
        },
        methods: {
            /**
             * update document && element size and position
             */
            updateMeasurement(){
                const body = document.body;
//                let winRect = this.winRect;
//                winRect.innerWidth = window.innerWidth;
//                winRect.innerHeight = window.innerHeight;
//                winRect.bodyWidth = body.offsetWidth;
//                winRect.bodyHeight = body.offsetHeight;
//                winRect.domWidth = document.documentElement.offsetWidth;
//                winRect.domHeight = document.documentElement.offsetHeight;
            },
            /**
             * init dom events
             */
            initEvts() {
//                window.addEventListener('resize', this.onResize);
                if (this.isNode(this.$el)) {
                    this.$el.addEventListener('scroll', this.onScroll);
                }
            },
            /**
             * remove listeners
             */
            unInitEvts() {
//                window.removeEventListener('resize', this.onResize);
                if (this.isNode(this.$el)) {
                    this.$el.removeEventListener('scroll', this.onScroll);
                }
            },

            /**
             * check the element is a node element
             */
            isNode(el) {
                return el && typeof el.nodeType === 'number';
            },
            /**
             * check whether the inner last element bottom
             * reaches the wrapper bottom
             */
            checkScrollBottom() {
                const scrollHeight = this.$el.scrollHeight;
                const totalHeight = this.$el.scrollTop + this.$el.clientHeight;
                const bottom = Math.abs(totalHeight - scrollHeight);
                return bottom <= this.options.bufferHeight;
            },

            /**
             * called when $el's scroll event is trigger
             */
            getOnScroll() {
                return this.debounce((e) => {
                    if (this.checkScrollBottom()) {
                        this.$emit(EVT_REACH_SCROLL_BOTTOM, e);
                    }
                }, 200);
            },

            getOnResize() {
                return this.debounce(this.updateMeasurement, 250);
            },

            /**
             * control the check action count
             * @param func
             * @param timeout
             */
            debounce(func, timeout = 100) {
                if (typeof func !== 'function') {
                    return function () {
                    };
                }
                let timeId = null;
                return function () {
                    if (timeId) {
                        clearTimeout(timeId);
                        timeId = null;
                    }
                    timeId = setTimeout(() => {
                        func.apply(this, arguments);
                    }, timeout);
                }.bind(this);
            }
        },
        mounted() {
            if (this.isNode(this.$el)) {
                this.scrollContainer = this.$el.firstChild;
            }
            this.initEvts();
            this.updateMeasurement();
            if (this.options.firstCheck) {
                if (this.checkScrollBottom()) {
                    this.$emit(EVT_REACH_CONTAINER_BOTTOM);
                }
            }
        },
        beforeDestroy() {
            this.unInitEvts();
        }
    }
</script>
<style>
    .visl-wrapper {
        position: relative !important;
        padding: 0 !important;

        overflow-x: hidden;
        overflow-y: auto;
    }
</style>
