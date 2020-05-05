<template>
    <pac-input-number v-if="['Integer','Double'].includes(spec.javaType)" ref="inner"
                      :label="label === undefined? spec.description : label" :required="required"
                      :readonly="readonly" :fraction="spec.lengthFraction"
                      :min="min === undefined? spec.min : min" :max="max === undefined? spec.max : max"
                      :value="value" @input="$emit('input', $event)"
                      @input:error="$emit('input:error', $event)"
                      :select="spec.select === undefined || suppressSelect? null : spec.select"
                      :values="values"/>
    <pac-input-string v-else-if="['String'].includes(spec.javaType)" ref="inner"
                      :label="label === undefined? spec.description : label" :required="required"
                      :readonly="readonly" :password="password" :length="spec.lengthString"
                      :value="value" @input="$emit('input', $event)"
                      @input:error="$emit('input:error', $event)"
                      :select="spec.select === undefined || suppressSelect? null : spec.select"
                      :values="values"/>
    <pac-input-date v-else-if="['java.util.Date'].includes(spec.javaType) && spec.datePrecision==='date'" ref="inner"
                    :label="label === undefined? spec.description : label" :required="required" :readonly="readonly"
                    :min="min === undefined? new Date(100,0,1) : min"
                    :max="max === undefined? new Date(9999,11,31) : max"
                    :value="value" @input="$emit('input', $event)"
                    @input:error="$emit('input:error', $event)"
                    :select="spec.select === undefined || suppressSelect? null : spec.select"/>
    <pac-input-datetime v-else-if="['java.util.Date'].includes(spec.javaType) && spec.datePrecision==='datetime'"
                        ref="inner"
                        :label="label === undefined? spec.description : label" :required="required" :readonly="readonly"
                        :min="min === undefined? new Date(100,0,1) : min"
                        :max="max === undefined? new Date(9999,11,31) : max"
                        :value="value" @input="$emit('input', $event)"
                        @input:error="$emit('input:error', $event)"
                        :select="spec.select === undefined || suppressSelect? null : spec.select"/>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {FieldSpec} from "../../gen/spec";
    import {formatDate, formatDateTime} from "@/components/gen/dateFormatter";
    import {PacValueModel} from "@/components/lib/pac-input/pac-value-model";

    @Component({name: 'pac-input'})
    export default class PacInput extends Vue {
        @Prop({validator: (value) => typeof (value) === 'string' || value === null, required: false})
        label?: string | null;

        @Prop({type: Object, required: true})
        spec!: FieldSpec;

        @Prop({type: Boolean, required: false, default: false})
        required!: boolean;

        @Prop({type: Boolean, required: false, default: false})
        readonly!: boolean;

        @Prop({type: [Number, Date], required: false})
        min?: number | Date;

        @Prop({type: [Number, Date], required: false})
        max?: number | Date;

        @Prop({type: Boolean, required: false, default: false})
        password!: boolean;

        @Prop({type: Boolean, required: false, default: false})
        suppressSelect!: boolean;

        @Prop({
            validator: (value) => typeof (value) === 'number' || typeof (value) === 'string' || value instanceof Date || value === null,
            required: true
        })
        value!: number | string | Date | null;

        get values(): Array<PacValueModel> {
            const values = this.spec.values;
            if (values !== undefined)
                return Object.keys(values).map(code => {
                    const value = values[code].value;
                    let valueStr = '';
                    if (typeof (value) === 'number') valueStr = value.toString();
                    else if (typeof (value) === 'string') valueStr = value;
                    else if (this.spec.datePrecision === 'date') valueStr = formatDate(value);
                    else valueStr = formatDateTime(value);
                    return new PacValueModel(valueStr, values[code].label);
                });
            else
                return [];
        }
    }
</script>

<style lang="scss">
</style>