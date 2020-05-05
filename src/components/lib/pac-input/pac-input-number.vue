<template>
    <div class="pac-input">
        <label :for="id">
            <span :class="{'no-label': label === null}">{{label}}</span>
        </label>
        <input :id="id" v-model.lazy="rawValue" :readonly="readonly"
               class="right" :class="{'error': message !== null}"/>
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

    @Component({name: 'pac-input-number'})
    export default class PacInputNumber extends PacInputCommon {
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        label!: string | null;

        @Prop({type: Boolean, required: false, default: false})
        required!: boolean;

        @Prop({type: Boolean, required: true})
        readonly!: boolean;

        @Prop({type: Number, required: true})
        min!: number;

        @Prop({type: Number, required: true})
        max!: number;

        @Prop({type: Number, required: true})
        fraction!: number;

        @Prop({validator: (value) => typeof (value) === 'number' || value === null, required: false, default: null})
        value!: number | null;

        @Watch('value')
        onValueChange(newVal: number | null): void {
            //外部更改
            if (newVal !== this.currentValue)
                this.rawValue = this.format(newVal);
        }

        //select或values都可触发选择
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        select!: string | null;

        get valueSelect(): Array<number> {
            return this.value !== null ? [this.value] : [];
        }

        @Prop({type: Array, required: false, default: () => []})
        values!: Array<PacValueModel>;

        get valueModel(): Array<PacValueModel> {
            return this.value !== null ? [new PacValueModel(this.value.toString())] : [];
        }

        //本地存根，emit前先更新它，以识别是外部更改还是内部更改
        currentValue: number | null = this.value;

        //一旦实例创建后便一定是string
        rawValue: string | null = null;

        created(): void {
            this.rawValue = this.format(this.value);
        }

        description(v: number): string | null {
            const valueModel = this.values.find(v2 => v2.value === v.toString());
            return valueModel === undefined ? null : valueModel.label;
        }

        id = PacCommon.nextInt().toString();

        message: string | null = null;

        format(value: number | null): string {
            return value !== null ? value.toString() : '';
        }

        pickerShown = false;

        pickModel(val: PacValueModel): void {
            this.rawValue = val.value;
        }

        pickSelect(val: number): void {
            this.rawValue = val.toString();
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
            //检测数字格式不正确
            if (!this.recognizeNumber(newVal)) {
                this.emit(null, `${this.label !== null ? this.label : ''}数字格式不正确`);
                return;
            }
            //数字规整化
            const normalized = this.normalizeNumber(newVal, this.fraction);
            if (normalized !== newVal) {
                this.rawValue = normalized;
                return;
            }
            //检测超出值范围
            const value = parseFloat(newVal);
            if (value < this.min || value > this.max) {
                this.emit(value, `${this.label !== null ? this.label : ''}数值超出区间范围`);
                return;
            }
            //枚举
            if (this.values.length > 0 && this.values.findIndex(v => v.value === value.toString()) === -1) {
                this.emit(null, `${this.label !== null ? this.label : ''}不合法的值`);
                return;
            }
            //成功
            this.emit(value, null);
        }

        emit(value: number | null, message: string | null): void {
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