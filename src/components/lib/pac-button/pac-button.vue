<template>
    <input class="pac-button" type="button" :value="text" @click="$emit('input')"/>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({name: 'pac-button'})
    export default class PacButton extends Vue {
        @Prop({type: String, required: true})
        text!: string;
    }
</script>

<style lang="scss">
    @import "pac-button";
</style>