<template>
    <li v-if="privilege" :class="{disabled: $route.path === me.target}" @click="goto($event)">
        <span>{{me.title}}</span>
        <img src="" alt="" v-if="me.items.length > 0"/>
        <pac-menu-item-group :shown="me.expanded" :path="path" :items="me.items"
                             @toggle="$emit('toggle', $event)"/>
    </li>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {PacMenuItemModel} from "@/components/lib/pac-menu/pac-menu-model";

    @Component({name: 'pac-menu-item'})
    export default class PacMenuItem extends Vue {
        @Prop({type: Array, required: true})
        path!: Array<PacMenuItemModel>;

        privilege = false;

        get me(): PacMenuItemModel {
            return this.path[this.path.length - 1];
        }

        goto(e: MouseEvent) {
            if (this.me.items.length > 0)
                this.$emit('toggle', this.path);
            else if (this.$route.path !== this.me.target) {
                const url = this.$router.resolve(this.me.target);
                window.open(url.href, '_blank');
            }
            e.stopPropagation();
        }

        async created() {
            this.privilege = await this.me.privilege();
        }
    }
</script>

<style lang="scss">
</style>