<template>
    <div class="pac-input">
        <label :for="id">
            <span :class="{'no-label': label === null}">{{label}}</span>
        </label>
        <input :id="id" v-model.lazy="rawValue" :maxLength="length"
               :type="password? 'password' : 'text'" :readonly="readonly"
               :class="{'error': message !== null}"/>
        <img style="margin-left: 2px" src="" alt=""
             :style="{display: !readonly && (select !== null || values.length > 0)? 'block' : 'none', visibility: pickerShown? 'hidden' : 'visible'}"
             @click="pickerShown = !pickerShown"/>
        <span v-if="values.length > 0 && value !== null" style="margin-left: 6px">{{description(value)}}</span>
        <pac-value-picker :multi-select="false" :values="values"
                          :value="valueModel" @input="pickModel($event[0])"
                          v-if="pickerShown && (select === null && values.length > 0)" @close="pickerShown = false"/>
        <pac-select-picker :multi-select="false" :select="select"
                           :value="valueSelect" @input="pickSelect($event[0])"
                           v-if="pickerShown && select !== null" @close="pickerShown = false"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Watch} from "vue-property-decorator";
    import PacInputCommon from "@/components/lib/pac-input/pac-input-common";
    import {PacValueModel} from "@/components/lib/pac-input/pac-value-model";
    import PacCommon from "@/components/lib/pac-common";
    import {PacErrorObj} from "@/components/lib/pac-errors/pac-errors-model";

    @Component({name: 'pac-input-string'})
    export default class PacInputString extends PacInputCommon {
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        label!: string | null;

        @Prop({type: Boolean, required: false, default: false})
        required!: boolean;

        @Prop({type: Boolean, required: true})
        readonly!: boolean;

        @Prop({type: Boolean, required: false, default: false})
        password!: boolean;

        @Prop({type: Number, required: true})
        length!: number;

        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        value!: string | null;

        @Watch('value')
        onValueChange(newVal: string | null): void {
            //外部更改
            if (newVal !== this.currentValue)
                this.rawValue = this.format(newVal);
        }

        //select或values都可触发选择
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        select!: string | null;

        get valueSelect(): Array<string> {
            return this.value !== null ? [this.value] : [];
        }

        @Prop({type: Array, required: false, default: () => []})
        values!: Array<PacValueModel>;

        get valueModel() {
            return this.value !== null ? [new PacValueModel(this.value)] : [];
        }

        //本地存根，emit前先更新它，以识别是外部更改还是内部更改
        currentValue: string | null = this.value;

        //一旦实例创建后便一定是string
        rawValue: string | null = null;

        created(): void {
            this.rawValue = this.format(this.value);
        }

        description(v: string): string | null {
            const valueModel = this.values.find(v2 => v2.value === v);
            return valueModel === undefined ? null : valueModel.label;
        }

        id = PacCommon.nextInt().toString();

        message: string | null = null;

        format(value: string | null): string {
            return value !== null ? value : '';
        }

        pickerShown = false;

        pickModel(val: PacValueModel): void {
            this.rawValue = val.value;
        }

        pickSelect(val: string): void {
            this.rawValue = val;
        }

        @Watch('rawValue')
        onRawValueChange(newVal: string): void {
            //必须填入
            if (this.required && newVal === '') {
                this.emit(null, `${this.label !== null ? this.label : ''}必须填入`);
                return;
            }
            //留白
            if (newVal === '') {
                this.emit(null, null);
                return;
            }
            const value = newVal;
            //枚举
            if (this.values.length > 0 && this.values.findIndex(v => v.value === value) === -1) {
                this.emit(null, `${this.label !== null ? this.label : ''}不合法的值`);
                return;
            }
            //成功
            this.emit(value, null);
        }

        emit(value: string | null, message: string | null): void {
            this.currentValue = value;
            this.message = message;
            this.$emit('input', value);
            this.$emit('input:error', new PacErrorObj(this.id, message));
        }
    }
</script>
<style lang="scss">
    @import "pac-input";
</style>