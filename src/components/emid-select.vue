<template>
    <pac-table style="max-width: 100%; max-height: 360px;"
            :model="tableModel" :list="list" :contentRange="contentRange"
            :pageSize="pageSize" @input:pageSize="pageSize = $event"
            @input:pageNumber="pageNumber = $event"
            :filterItemsModel="filterItemsModel"
            :sortModel="sortModel" @input:sortModel="sortModel = $event"
            :selection="selection.map(v => bean(v))"
            @input:selection="$emit('input:selection', $event.map(v => v.emid))"
            @refresh="query()"
            :compare="(e1, e2) => e1.emid === e2.emid">
        <template v-slot:emid="data">
            <div class="cell-right">{{data.element.emid}}</div>
        </template>
        <template v-slot:emname="data">
            {{data.element.emname}}
        </template>
    </pac-table>
</template>
<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {Employee} from "@/components/gen/bean/Employee";
    import {ContentRange} from "@/components/gen/range";
    import {FilterItemsModel} from "@/components/lib/pac-table/filter-items-model";
    import {EMPLOYEE_SPEC} from "@/components/gen/spec/EmployeeSpec";
    import {SortModel} from "@/components/lib/pac-table/sort-model";
    import {queryEmployee} from "@/components/gen/stub/EmployeeStub";

    @Component({name: 'emid-select'})
    export default class EmidSelect extends Vue {
        @Prop({type: Boolean, required: false, default: false})
        multiSelect!: boolean;
        tableModel = new PacTableModel(this.multiSelect ? 'multiple' : 'single')
            .appendField(new PacTableFieldModel('emid', '雇员号', 90, true, true))
            .appendField(new PacTableFieldModel('emname', '雇员姓名', 420, true, true));
        pageSize = 50;
        pageNumber = 1;
        filterItemsModel = new FilterItemsModel(EMPLOYEE_SPEC);
        sortModel: SortModel | null = null;
        contentRange = new ContentRange();
        list = new Array<Employee>();

        @Prop({type: Array, required: false, default: () => []})
        selection !: Array<number>;

        created(): void {
            this.query();
        }

        async query(): Promise<void> {
            try {
                const {list, contentRange} = await queryEmployee({
                    filter: this.filterItemsModel.expr,
                    orderBy: this.sortModel?.expr?.only(),
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                });
                this.list = list;
                this.contentRange = contentRange;
            } catch (e) {
                console.error(e);
            }
        }

        bean(emid: number): Employee {
            return new Employee(emid);
        }
    }
</script>
<style lang="scss" scoped>
    .cell-right {
        width: 100%;
        height: fit-content;
        vertical-align: center;
        text-align: right;
    }
</style>