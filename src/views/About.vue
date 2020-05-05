<template>
    <div class="about" style="background-color: #f7f8f9">
        <h1>This is an about page</h1>
        <button @click="shown=!shown">Toggle</button>
        <pac-menu :shown="shown" :value="menu"/>
        <pac-frame style="margin: 8px">
            <pac-input style="margin: 14px"
                       :required="false" :spec="spec.fields.emid" v-model="bean.emid"
                       @input:error="e.set($event)"/>
            <pac-input style="margin: 14px"
                       :spec="spec.fields.emname" v-model="bean.emname"
                       @input:error="e.set($event)"/>
            <pac-input style="margin: 14px"
                       :spec="spec.fields.emgender" v-model="bean.emgender"
                       @input:error="e.set($event)"/>
            <pac-input style="margin: 14px"
                       :spec="spec.fields.emstatus" v-model="bean.emstatus"
                       @input:error="e.set($event)"/>
        </pac-frame>
        <pac-errors style="margin-left: 8px; width: calc(100% - 16px);" :value="e" @input:focus="focus($event)"/>
        <pac-tab style="margin: 8px" ref="tabs1"
                 :tabs="tabs1" :disabledTabs="[1]" :selectedTab="selectedTab1"
                 @input:selectedTab="selectedTab1 = $event">
            <template v-slot:0>
                <pac-input style="margin: 14px"
                           :required="false" :spec="spec.fields.emamount" v-model="bean.emamount"
                           @input:error="e.set($event.wrap('0').wrap('tabs1'))"/>
                <pac-input style="margin: 14px"
                           :spec="spec.fields.embirthday" v-model="bean.embirthday"
                           @input:error="e.set($event.wrap('0').wrap('tabs1'))"/>
            </template>
            <template v-slot:1/>
            <template v-slot:2>ccc</template>
            <template v-slot:3>
                <pac-input-number-list style="margin: 14px"
                                       label="数字清单" :required="true" v-model="emids"
                                       :min="0" :max="100" :fraction="2" separator=","
                                       :validate="async (v) => null"
                                       :minSize="2" :maxSize="2"
                                       :readonly="true"
                                       @input:error="e.set($event.wrap('3').wrap('tabs1'))"/>
                <pac-input-number-list style="margin: 14px"
                                       label="数字UDC清单" :required="false" v-model="emstatuses"
                                       :min="0" :max="100" :fraction="0" separator="/"
                                       :validate="async (v) => null"
                                       :minSize="2" :maxSize="2"
                                       :readonly="false"
                                       :values="valueModels1"
                                       @input:error="e.set($event.wrap('3').wrap('tabs1'))"/>
            </template>
            <template v-slot:4>
                <pac-input-string-list style="margin: 14px"
                                       label="文字清单" :required="true" v-model="emnames"
                                       :length="4" separator=","
                                       :minSize="2" :maxSize="2"
                                       :validate="async (v) => null"
                                       :readonly="true"
                                       @input:error="e.set($event.wrap('4').wrap('tabs1'))"/>
                <pac-input-string-list style="margin: 14px"
                                       label="文字UDC清单" :required="false" v-model="emgenders"
                                       :length="4" separator=","
                                       :minSize="2" :maxSize="2"
                                       :validate="async (v) => null"
                                       :readonly="false"
                                       :values="valueModels2"
                                       @input:error="e.set($event.wrap('4').wrap('tabs1'))"/>
            </template>
            <template v-slot:5>
                <pac-input-list style="margin: 14px"
                                :required="false" :spec="spec.fields.emamount" v-model="emamounts"
                                @input:error="e.set($event.wrap('4').wrap('tabs1'))"/>
            </template>
        </pac-tab>
        <pac-tab style="margin: 8px"
                 :tabs="tabs2" :disabledTabs="[1]" :selectedTab="selectedTab2"
                 @input:selectedTab="selectedTab2 = $event">
            <template v-slot:0>
                <pac-table-filter-item v-model="filterItemModel" :operand1Fixed="true"/>
                <pac-table-filter-item-operand2 v-model="operand2a" type="single" :spec="spec.fields.embirthday"/>
                <pac-table-filter-item-operand2 v-model="operand2b" type="range" :spec="spec.fields.emname"/>
                <pac-table-filter-item-operand2 v-model="operand2c" type="list" :spec="spec.fields.emstatus"/>
            </template>
            <template v-slot:2>
                <pac-table-filter v-model="filterItemsModel1"/>
                <pac-table-filter v-model="filterItemsModel1" field="embirthday"/>
            </template>
        </pac-tab>
        <pac-table style="margin: 8px; max-width: calc(100% - 16px); max-height: 600px;"
                   :model="tableModel1" :list="list1" :contentRange="contentRange1"
                   :pageSize="pageSize1" @input:pageSize="pageSize1 = $event"
                   @input:pageNumber="pageNumber1 = $event"
                   :filterItemsModel="filterItemsModel1"
                   :sortModel="sortModel1" @input:sortModel="sortModel1 = $event"
                   :selection="selection1" @input:selection="selection1 = $event"
                   @refresh="query1()"
                   :compare="(e1, e2) => e1.emid === e2.emid">
            <!--            :pageNumber="pageNumber1" @input:pageNumber="pageNumber1 = $event"-->
            <template v-slot:emid="data">{{data.element.emid.toString()}}</template>
            <template v-slot:emname="data">{{data.element.emname}}</template>
            <template v-slot:emgender="data">{{data.element.emgender}}</template>
            <template v-slot:emstatus="data">{{data.element.emstatus}}</template>
        </pac-table>
        <pac-table style="margin: 8px; max-width: calc(100% - 16px); max-height: 600px;"
                   :model="tableModel2" :list="list2" :contentRange="contentRange2"
                   :pageSize="pageSize2" @input:pageSize="pageSize2 = $event" :paging="false"
                   @input:pageNumber="pageNumber1 = $event"
                   :filterItemsModel="filterItemsModel2"
                   :sortModel="sortModel2" @input:sortModel="sortModel2 = $event"
                   :selection="selection2" @input:selection="selection2 = $event"
                   @refresh="query2()"
                   :compare="(e1, e2) => e1.emid === e2.emid">
            <!--            :pageNumber="pageNumber2" @input:pageNumber="pageNumber2 = $event"-->
            <template v-slot:emid="data">{{data.element.emid.toString()}}</template>
            <template v-slot:emname="data">
                <pac-input
                        :label="null" :spec="spec.fields.emname"
                        :required="true" :value="data.element.emname"
                        @input:error="e.set($event)"/>
            </template>
            <template v-slot:emgender="data">{{data.element.emgender}}</template>
            <template v-slot:emstatus="data">{{data.element.emstatus}}</template>
        </pac-table>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {PacMenuItemModel} from "@/components/lib/pac-menu/pac-menu-model";
    import {Employee} from "@/components/gen/bean/Employee";
    import {EMPLOYEE_SPEC} from "@/components/gen/spec/EmployeeSpec";
    import {PacTableFieldModel, PacTableModel} from "@/components/lib/pac-table/pac-table-model";
    import {ContentRange} from "@/components/gen/range";
    import {PacValueModel} from "@/components/lib/pac-input/pac-value-model";
    import {FilterItemModel} from "@/components/lib/pac-table/filter-item-model";
    import {FilterItemsModel} from "@/components/lib/pac-table/filter-items-model";
    import {queryEmployee} from "@/components/gen/stub/EmployeeStub";
    import {SortModel} from "@/components/lib/pac-table/sort-model";
    import {PacErrorModel, PacErrorObj, PacErrorsModel} from "@/components/lib/pac-errors/pac-errors-model";

    @Component({components: {}})
    export default class About extends Vue {
        shown = false;
        menu = [
            new PacMenuItemModel('嘉里建设').append(
                new PacMenuItemModel('财务', '', 0, async () => false),
                new PacMenuItemModel('市场').append(
                    new PacMenuItemModel('租赁'),
                    new PacMenuItemModel('销售')),
                new PacMenuItemModel('物业').append(
                    new PacMenuItemModel('客服'),
                    new PacMenuItemModel('保安'),
                    new PacMenuItemModel('保养'),
                    new PacMenuItemModel('保洁')))
        ];
        spec = EMPLOYEE_SPEC;
        bean = new Employee();
        e = new PacErrorsModel();
        tabs1: Array<string> = ['个人信息', '公司信息', '社会信息', '个人信息', '公司信息', '社会信息', '个人信息', '公司信息', '社会信息', '个人信息', '公司信息', '社会信息', '个人信息', '公司信息', '社会信息', '个人信息', '公司信息', '社会信息', '个人信息', '公司信息', '社会信息', '个人信息', '公司信息', '社会信息', '个人信息', '公司信息', '社会信息Last'];
        selectedTab1 = 1;
        tabs2: Array<string> = ['个人信息', '公司信息', '社会信息'];
        selectedTab2 = 0;
        tableModel1 = new PacTableModel('single')
            .appendField(new PacTableFieldModel('emid', '雇员号', 120, true, true))
            .appendField(new PacTableFieldModel('emname', '雇员姓名', 240, true, true))
            .appendField(new PacTableFieldModel('emgender', '性别', 90, true, true))
            .appendField(new PacTableFieldModel('emstatus', '状态', 90, true, true));
        pageSize1 = 50;
        pageNumber1 = 1;
        contentRange1 = new ContentRange(1, 2, 3);
        list1 = [
            new Employee(1, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.FEMALE.value, 'Mary', 1000, new Date(2000, 0, 18)),
            new Employee(2, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'John', 1000, new Date(2000, 0, 18)),
            new Employee(3, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18))
        ];
        selection1 = [
            new Employee(1)
        ];
        tableModel2 = new PacTableModel('multiple')
            .appendField(new PacTableFieldModel('emid', '雇员号', 120, true, true))
            .appendField(new PacTableFieldModel('emname', '雇员姓名', 240, true, true))
            .appendField(new PacTableFieldModel('emgender', '性别', 90, true, true))
            .appendField(new PacTableFieldModel('emstatus', '状态', 90, true, true));
        pageSize2 = 50;
        pageNumber2 = 2;
        contentRange2 = new ContentRange(3, 3, 3);
        list2 = [
            new Employee(1, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.FEMALE.value, 'Mary', 1000, new Date(2000, 0, 18)),
            new Employee(2, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'John', 1000, new Date(2000, 0, 18)),
            new Employee(3, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(4, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(5, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(6, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(7, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(8, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(9, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(10, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(11, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(12, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(13, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(14, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(15, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(16, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(17, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(18, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(19, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(20, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(21, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(22, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(23, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(24, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(25, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(26, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(27, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(28, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(29, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(30, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(31, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(32, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(33, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(34, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(35, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(36, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(37, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(38, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(39, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(40, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(41, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18)),
            new Employee(42, this.spec.fields.emstatus.default, this.spec.fields.emgender.values.MALE.value, 'Tom', 1000, new Date(2000, 0, 18))
        ];
        selection2 = [
            new Employee(2),
            new Employee(3)
        ];
        range1 = [null, null];
        range2 = [null, null];
        emids = [];
        emstatuses = [];
        valueModels1 = [new PacValueModel('0', 'Valid'), new PacValueModel('1', 'Invalid')];
        emnames = [];
        emgenders = [];
        emamounts = [];
        valueModels2 = [new PacValueModel('F', 'Female'), new PacValueModel('M', 'Male')];
        filterItemModel = new FilterItemModel(this.spec, 'emid');
        operand2a = null;
        operand2b = null;
        operand2c = null;
        filterItemsModel1: FilterItemsModel | null = new FilterItemsModel(this.spec)
            .add(new FilterItemModel(this.spec, 'emid', false, null, null))
            .add(new FilterItemModel(this.spec, 'emid', false, null, null))
            .add(new FilterItemModel(this.spec, 'emid', false, null, null));
        sortModel1: SortModel | null = new SortModel('emid', 'ascending');

        async query1(): Promise<void> {
            try {
                const {list, contentRange} = await queryEmployee({
                    filter: this.filterItemsModel1?.expr,
                    orderBy: this.sortModel1?.expr?.only(),
                    pageSize: this.pageSize1,
                    pageNumber: this.pageNumber1
                });
                this.list1 = list;
                this.contentRange1 = contentRange;
                this.e.set(new PacErrorObj('t1', null));
            } catch (e) {
                this.e.set(new PacErrorObj('t1', e.statusCode === 500 ? {
                    subject: '服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                } : {subject: '远程服务器错误', content: `远程服务器状态：500`}));
            }
        }

        filterItemsModel2: FilterItemsModel | null = null;
        sortModel2: SortModel | null = null;

        async query2(): Promise<void> {
            try {
                const {list, contentRange} = await queryEmployee({
                    filter: this.filterItemsModel2?.expr,
                    orderBy: this.sortModel2?.expr?.only(),
                    pageSize: this.pageSize2,
                    pageNumber: this.pageNumber2
                });
                this.list2 = list;
                this.contentRange2 = contentRange;
                this.e.set(new PacErrorObj('t2', null));
            } catch (e) {
                this.e.set(new PacErrorObj('t2', e.statusCode === 500 ? {
                    subject: '服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                } : {subject: '远程服务器错误', content: `远程服务器状态：500`}));
            }
        }

        focus(error: PacErrorModel) {
            if (error.paths[0] === 'tabs1')
                this.selectedTab1 = parseInt(error.paths[1]);
            if (error.paths[0] === 'tabs2')
                this.selectedTab2 = parseInt(error.paths[1]);
            this.$nextTick(() => document.getElementById(error.id)?.focus());
        }
    }
</script>
<style lang="scss" scoped>
    div.pac-tab {
        height: 200px;
    }
</style>