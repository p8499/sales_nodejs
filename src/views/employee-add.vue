<template>
    <pac-form :name="pages.getTitle($route.name)" :url="url">
        <pac-errors style="width: 100%; margin-bottom: 14px;"
                    :value="errorsModel" @input:focus="focus($event)"/>
        <pac-frame style="width: 100%;" name="基本信息">
            <div style="padding: 14px 14px 14px 14px">
                <pac-input :spec="spec.fields.emid" v-model="employee.emid" :suppressSelect="true"
                           @input:error="errorsModel.set($event)"/>
                <pac-input style="margin-top: 14px;" :spec="spec.fields.emstatus" v-model="employee.emstatus"
                           @input:error="errorsModel.set($event)"/>
                <pac-input style="margin-top: 14px;" :spec="spec.fields.emname" v-model="employee.emname"
                           @input:error="errorsModel.set($event)"/>
                <pac-input style="margin-top: 14px;" :spec="spec.fields.embirthday" v-model="employee.embirthday"
                           @input:error="errorsModel.set($event)"/>
            </div>
        </pac-frame>
        <pac-button text="Save" style="margin-top: 14px;" @input="add()"/>
    </pac-form>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Employee} from "@/components/gen/bean/Employee";
    import {addEmployee} from "@/components/gen/stub/EmployeeStub";
    import {PacErrorModel, PacErrorObj, PacErrorsModel} from "@/components/lib/pac-errors/pac-errors-model";
    import {EMPLOYEE_SPEC} from "@/components/gen/spec/EmployeeSpec";
    import pages from "@/pages";

    @Component({name: 'employee-add'})
    export default class EmployeeAdd extends Vue {
        pages = pages;
        spec = EMPLOYEE_SPEC;
        errorsModel = new PacErrorsModel();
        employee = new Employee();

        get url(): string {
            return `/employee-add`;
        }

        async add(): Promise<void> {
            try {
                const {statusCode} = await addEmployee(this.employee);
                this.errorsModel.set(new PacErrorObj('add', statusCode < 400 ? null : {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${statusCode}}`
                }));
                if (statusCode < 400)
                    this.$router.back();
            } catch (e) {
                this.errorsModel.set(new PacErrorObj('add', {
                    subject: '远程服务器错误',
                    content: `远程服务器状态：${e.statusCode}`
                }));
            }
        }

        focus(error: PacErrorModel) {
            this.$nextTick(() => document.getElementById(error.id)?.focus());
        }
    }
</script>

<style lang="scss" scoped>

</style>