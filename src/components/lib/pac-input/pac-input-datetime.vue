<template>
    <div class="pac-input">
        <label :for="id">
            <span :class="{'no-label': label === null}">{{label}}</span>
        </label>
        <input :id="id" v-model.lazy="rawValue" :readonly="readonly"
               class="right" :class="{'error': message !== null}"/>
        <img style="margin-left: 2px" src="" alt="" class="datetime"
             :style="{display: !readonly ? 'block' : 'none', visibility: pickerShown? 'hidden' : 'visible'}"
             @click="pickerShown = !pickerShown"/>
        <pac-datetime-picker precision="datetime" :value="value === null? new Date() : value" @input="pick($event)"
                             v-if="pickerShown && select === null" @close="pickerShown = false"/>
        <pac-select-picker :multi-select="false" :select="select"
                           :value="valueSelect" @input="pick($event[0])"
                           v-if="pickerShown && select !== null" @close="pickerShown = false"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Watch} from "vue-property-decorator";
    import PacInputCommon from "@/components/lib/pac-input/pac-input-common";
    import PacCommon from "@/components/lib/pac-common";
    import {PacErrorObj} from "@/components/lib/pac-errors/pac-errors-model";

    @Component({name: 'pac-input-datetime'})
    export default class PacInputDatetime extends PacInputCommon {
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        label!: string | null;

        @Prop({type: Boolean, required: false, default: false})
        required!: boolean;

        @Prop({type: Boolean, required: true})
        readonly!: boolean;

        @Prop({type: Date, required: true})
        min!: Date;

        @Prop({type: Date, required: true})
        max!: Date;

        @Prop({validator: (value) => value instanceof Date || value === null, required: false, default: null})
        value!: Date | null;

        @Watch('value')
        onValueChange(newVal: Date | null): void {
            //外部更改
            if (newVal !== this.currentValue)
                this.rawValue = this.format(newVal);
        }

        //select可触发另一种选择
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false, default: null})
        select!: string | null;

        get valueSelect(): Array<Date> {
            return this.value !== null ? [this.value] : [];
        }

        //本地存根，emit前先更新它，以识别是外部更改还是内部更改
        currentValue: Date | null = this.value;

        //一旦实例创建后便一定是string
        rawValue: string | null = null;

        created(): void {
            this.rawValue = this.format(this.value);
        }

        id = PacCommon.nextInt().toString();

        message: string | null = null;

        format(value: Date | null): string {
            return value !== null ? this.datetimeToString(value) : '';
        }

        pickerShown = false;

        pick(date: Date) {
            this.rawValue = this.datetimeToString(date);
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
            //检测日期时间格式不正确
            if (!this.recognizeDatetime(newVal)) {
                this.emit(null, `${this.label !== null ? this.label : ''}日期格式不正确`);
                return
            }
            //日期时间规整化
            const normalized = this.normalizeDatetime(newVal);
            if (normalized !== newVal) {
                this.rawValue = normalized;
                return;
            }
            //检测日期意义不正确
            if (!this.validateDatetime(newVal)) {
                this.emit(null, `${this.label !== null ? this.label : ''}日期格式不正确`);
                return
            }
            //检测超出值范围
            const date = this.stringToDatetime(newVal);
            if (date.getTime() < this.min.getTime() || date.getTime() > this.max.getTime()) {
                this.emit(null, `${this.label !== null ? this.label : ''}数值超出区间范围`);
                return
            }
            //成功
            this.emit(date, null);
        }

        emit(value: Date | null, message: string | null): void {
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