import {Component, Vue} from "vue-property-decorator";
import {decode, encode} from "universal-base64";
import {filterExprToItemsModel, FilterItemsModel} from "@/components/lib/pac-table/filter-items-model";
import {BeanSpec} from "@/components/gen/spec";
import {deserializeFilterExpr, FilterLogicExpr} from "@/components/gen/filter";
import {orderByExprToModel, SortModel} from "@/components/lib/pac-table/sort-model";
import {deserializeOrderByExpr, OrderByExpr} from "@/components/gen/order";

function trimLeft(str: string, char: string): string {
    let dPos = 0;
    for (let i = 0; i < str.length; i++)
        if (str[i] !== char) {
            dPos = i;
            break;
        }
    return str.substring(dPos);
}

function unique(arr: Array<any>): Array<any> {
    const newArr = [];
    for (let i = 0; i < arr.length; i++)
        if (newArr.indexOf(arr[i]) == -1)
            newArr.push(arr[i]);
    return newArr;
}

function coalesce(...values: Array<any>): any {
    for (const value of values)
        if (value !== undefined)
            return value;
    return undefined;
}

function elvis<T>(obj: any, func: (obj: any) => T): T | undefined {
    if (obj !== undefined)
        return func(obj);
    else
        return undefined;
}

function filterItemsModelToString(model: FilterItemsModel | null | undefined): string | undefined {
    const expr = model?.expr;
    return expr instanceof FilterLogicExpr ? encode(expr.toString()) : undefined;
}

function stringToFilterItemsModel(spec: BeanSpec, str?: string): FilterItemsModel | undefined {
    if (typeof (str) === 'string')
        return filterExprToItemsModel(deserializeFilterExpr(decode(str)) as FilterLogicExpr, spec);
}

function sortModelToString(model: SortModel | null | undefined): string | undefined {
    return model instanceof SortModel ? model.expr.only().toString() : undefined;
}

function stringToSortModel(str?: string): SortModel | undefined {
    if (typeof (str) === 'string')
        return orderByExprToModel(deserializeOrderByExpr(str) as OrderByExpr)
}

function numberToString(num: number): string {
    return num.toString();
}

function stringToNumber(str?: string): number | undefined {
    if (typeof (str) === 'string')
        return parseInt(str);
}

@Component({name: 'pac-common'})
export default class PacCommon extends Vue {
    private static _nextInt = 0;

    static nextInt(): number {
        return PacCommon._nextInt++;
    }

    trimLeft = trimLeft;
    unique = unique;
    elvis = elvis;
    filterItemsModelToString = filterItemsModelToString;
    stringToFilterItemsModel = stringToFilterItemsModel;
    sortModelToString = sortModelToString;
    stringToSortModel = stringToSortModel;
    numberToString = numberToString;
    stringToNumber = stringToNumber;
}
export {
    trimLeft,
    unique,
    coalesce,
    elvis,
    filterItemsModelToString,
    stringToFilterItemsModel,
    sortModelToString,
    stringToSortModel,
    numberToString,
    stringToNumber
}