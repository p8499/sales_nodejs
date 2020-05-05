<template>
    <div class="pac-form">
        <div>
            <div>
                <span style="margin-left: 16px;">{{name}}</span>
            </div>
            <div>
                <img src="" alt="" style="margin-right: 6px;" @click="$alert(baseUrl + url)"/>
                <img src="" alt="" style="margin-right: 6px;" v-if="hasPrevious"
                     @click="$router.back()"/>
            </div>
        </div>
        <div>
            <slot/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {HTML_BASE_URL} from "@/components/gen/common";

    @Component({name: 'pac-form'})
    export default class PacForm extends Vue {
        @Prop({type: String, required: true})
        name!: string;

        @Prop({type: String, required: true})
        url!: string;

        baseUrl = HTML_BASE_URL;

        get hasPrevious(): boolean {
            return window.history.length > 0;
        }
    }
</script>

<style lang="scss">
    @import "pac-form";
</style>