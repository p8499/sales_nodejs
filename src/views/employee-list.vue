<template>
    <pac-form :name="pages.getTitle($route.name)" :url="url">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event)"/>
        <div>
            <pac-button text="Add" @input="add()"/>
            <pac-button text="Delete" @input="del()" v-if="selection.length > 0" style="margin-left: 8px;"/>
        </div>
        <pac-table style="margin-top: 14px; max-width: 100%; max-height: 520px;"
                   :model="tableModel" :list="list" :contentRange="contentRange"
                   :pageSize="pageSize" @input:pageSize="pageSize = $event"
                   @input:pageNumber="pageNumber = $event"
                   :filterItemsModel="filterItemsModel"
                   :sortModel="sortModel" @input:sortModel="sortModel = $event"
                   :selection="selection" @input:selection="selection = $event"
                   @refresh="query()"
                   :compare="(e1, e2) => e1.emid === e2.emid">
            <template v-slot:emid="data">
                <div class="cell-right clickable" @click="update(data.element.emid)">{{data.element.emid}}</div>
            </template>
            <template v-slot:emname="data">
                {{data.element.emname}}
            </template>
            <template v-slot:emgender="data">
                {{spec.fields.emgender.getLabel(data.element.emgender)}}
            </template>
            <template v-slot:emstatus="data">
                {{spec.fields.emstatus.getLabel(data.element.emstatus)}}
            </template>
            <template v-slot:embirthday="data">
                <div class="cell-right">
                    {{data.element.embirthday !== null? dateToString(data.element.embirthday) : ''}}
                </div>
            </template>
            <template v-slot:emamount="data">
                <div class="cell-right"> {{data.element.emamount.toFixed(2)}}</div>
            </template>
        </pac-table>
    </pac-form>
</template>

<script lang="ts">
    import {Employee} from "@/components/gen/bean/Employee";
    import {ContentRange} from "@/components/gen/range";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {batchDeleteEmployee, queryEmployee} from "@/components/gen/stub/EmployeeStub";
    import {PacErrorModel, PacErrorObj, PacErrorsModel} from "@/components/lib/pac-errors/pac-errors-model";
    import {FilterItemsModel} from "@/components/lib/pac-table/filter-items-model";
    import {SortModel} from "@/components/lib/pac-table/sort-model";
    import {EMPLOYEE_SPEC} from "@/components/gen/spec/EmployeeSpec";
    import {dateToString} from "@/components/lib/pac-input/pac-input-common";
    import {filterItemsModelToString, numberToString, sortModelToString} from "@/components/lib/pac-common";
    import {parameters} from "@/components/gen/common";
    import {Component, Prop, Vue} from "vue-property-decorator";
    import pages from "@/pages";

    @Component({name: 'employee-list'})
    export default class EmployeeList extends Vue {
        @Prop({type: Number, required: false, default: 50})
        initPageSize!: number;
        pageSize = this.initPageSize;

        @Prop({type: Number, required: false, default: 1})
        initPageNumber!: number;
        pageNumber = this.initPageNumber;

        @Prop({type: Object, required: false, default: () => new FilterItemsModel(EMPLOYEE_SPEC)})
        initFilterItemsModel!: FilterItemsModel;
        filterItemsModel = this.initFilterItemsModel;

        @Prop({type: Object, required: false, default: null})
        initSortModel!: SortModel | null;
        sortModel = this.initSortModel;

        pages = pages;
        spec = EMPLOYEE_SPEC;
        dateToString = dateToString;
        errorsModel = new PacErrorsModel();
        tableModel = new PacTableModel('multiple')
            .appendField(new PacTableFieldModel('emid', '雇员号', 90, true, true))
            .appendField(new PacTableFieldModel('emname', '雇员姓名', 420, true, true))
            .appendField(new PacTableFieldModel('emgender', '性别', 90, true, true))
            .appendField(new PacTableFieldModel('emstatus', '状态', 90, true, true))
            .appendField(new PacTableFieldModel('embirthday', '生日', 120, true, true))
            .appendField(new PacTableFieldModel('emamount', '销售额', 120, true, true));
        list = new Array<Employee>();
        contentRange = new ContentRange();
        selection = new Array<Employee>();

        created(): void {
            this.query();
        }

        get url(): string {
            return `/${this.$route.name}${parameters(Object({
                filter: filterItemsModelToString(this.filterItemsModel),
                sort: sortModelToString(this.sortModel),
                'page-size': numberToString(this.pageSize),
                'page-number': numberToString(this.pageNumber)
            }))}`;
        }

        add(): void {
            this.$router.push({name: 'employee-add'});
        }

        update(emid: number): void {
            this.$router.push({
                name: 'employee-update',
                params: {
                    emid: emid.toString()
                }
            });
        }

        async query(): Promise<void> {
            try {
                const {statusCode, list, contentRange} = await queryEmployee({
                    filter: this.filterItemsModel.expr,
                    orderBy: this.sortModel?.expr?.only(),
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber
                });
                this.list = list;
                this.contentRange = contentRange;
                this.errorsModel.set(new PacErrorObj('query', statusCode < 400 ? null : {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${statusCode}}`
                }));
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('query', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            }
        }

        async del(): Promise<void> {
            const list = await batchDeleteEmployee(this.selection.flatMap(v => v.emid !== null ? [v.emid] : []).map(v => Object({emid: v})));
            const success = list.filter((value) => value.statusCode < 400);
            const failure = list.filter((value) => value.statusCode >= 400);
            if (success.length == 0 && failure.length == 1)
                this.errorsModel.set(new PacErrorObj('del', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${failure[0].statusCode}`
                }));
            else
                this.errorsModel.set(new PacErrorObj('del', `Deletion result: ${success.length} succeeded, ${failure.length} failed.`));
            if (success.length > 0)
                this.query();
        }

        focus(error: PacErrorModel) {
            this.$nextTick(() => document.getElementById(error.id)?.focus());
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

    .clickable {
        text-decoration: underline;
        color: #145c9e;
        cursor: pointer;
    }
</style>