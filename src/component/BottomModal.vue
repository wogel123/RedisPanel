<template>
    <div>
        <div class="modal-overlay" @click="close"></div>
        <div class="modal">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "bottomModal",
        data() {
            return {
            }
        },
        mounted(){
            window.document.addEventListener('keydown', this.closeOnESC);
        },
        beforeDestroy () {
            window.document.removeEventListener('keydown', this.closeOnESC);
        },
        methods: {
            close() {
                this.$emit('close')
            },
            closeOnESC(key) {
                if(key.keyCode === 27){
                    this.close()
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .close {
        animation-direction: reverse;
    }
    .modal-overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        animation-name: fadeIn;
        animation-duration: 1s;
        background-color: #000000;
        will-change: opacity;
        animation-fill-mode: both;
    }


    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to{
            opacity: .4;
        }
    }


    .modal {
        position: fixed;
        left: 0;
        right: 0;
        height: 45%;
        background-color: #ffffff;
        animation-name: up;
        animation-duration: 1s;
        animation-fill-mode: both;
        will-change: bottom;
    }

    @keyframes up {
        from{
            bottom: -45%;
        }
        to{
            bottom: 0;
        }
    }

</style>