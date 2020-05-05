import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import store from './store'

import PacMenu from "@/components/lib/pac-menu/pac-menu.vue";
import PacMenuItemGroup from "@/components/lib/pac-menu/pac-menu-item-group.vue";
import PacMenuItem from "@/components/lib/pac-menu/pac-menu-item.vue";
import PacInput from "@/components/lib/pac-input/pac-input.vue";
import PacInputList from "@/components/lib/pac-input/pac-input-list.vue";
import PacInputNumberList from "@/components/lib/pac-input/pac-input-number-list.vue";
import PacInputNumber from "@/components/lib/pac-input/pac-input-number.vue";
import PacInputStringList from "@/components/lib/pac-input/pac-input-string-list.vue";
import PacInputString from "@/components/lib/pac-input/pac-input-string.vue";
import PacInputDate from "@/components/lib/pac-input/pac-input-date.vue";
import PacInputDatetime from "@/components/lib/pac-input/pac-input-datetime.vue";
import PacFrame from "@/components/lib/pac-frame/pac-frame.vue";
import PacTab from "@/components/lib/pac-tab/pac-tab.vue";
import PacTable from "@/components/lib/pac-table/pac-table.vue";
import PacTableFilter from "@/components/lib/pac-table/pac-table-filter.vue";
import PacTableFilterItem from "@/components/lib/pac-table/pac-table-filter-item.vue";
import PacTableFilterItemOperand2 from "@/components/lib/pac-table/pac-table-filter-item-operand2.vue";
import PacDatetimePicker from "@/components/lib/pac-input/pac-datetime-picker.vue";
import PacValuePicker from "@/components/lib/pac-input/pac-value-picker.vue";
import PacSelectPicker from "@/components/lib/pac-input/pac-select-picker.vue";
import PacErrors from '@/components/lib/pac-errors/pac-errors.vue';
import PacForm from '@/components/lib/pac-form/pac-form.vue';
import PacButton from '@/components/lib/pac-button/pac-button.vue';
import {EMPLOYEE_SPEC} from "@/components/gen/spec/EmployeeSpec";

import EmidSelect from '@/components/emid-select.vue';

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.component('pac-menu', PacMenu);
Vue.component('pac-menu-item-group', PacMenuItemGroup);
Vue.component('pac-menu-item', PacMenuItem);
Vue.component('pac-datetime-picker', PacDatetimePicker);
Vue.component('pac-value-picker', PacValuePicker);
Vue.component('pac-select-picker', PacSelectPicker);
Vue.component('pac-input-number', PacInputNumber);
Vue.component('pac-input-string', PacInputString);
Vue.component('pac-input-date', PacInputDate);
Vue.component('pac-input-datetime', PacInputDatetime);
Vue.component('pac-input', PacInput);
Vue.component('pac-input-list', PacInputList);
Vue.component('pac-input-number-list', PacInputNumberList);
Vue.component('pac-input-string-list', PacInputStringList);
Vue.component('pac-frame', PacFrame);
Vue.component('pac-tab', PacTab);
Vue.component('pac-table', PacTable);
Vue.component('pac-table-filter', PacTableFilter);
Vue.component('pac-table-filter-item', PacTableFilterItem);
Vue.component('pac-table-filter-item-operand2', PacTableFilterItemOperand2);
Vue.component('pac-errors', PacErrors);
Vue.component('pac-form', PacForm);
Vue.component('pac-button', PacButton);

Vue.component('emid-select', EmidSelect);
Object.defineProperty(EMPLOYEE_SPEC.fields.emid, 'select', {value: 'emid-select'});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
