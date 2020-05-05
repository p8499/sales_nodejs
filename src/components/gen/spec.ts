type JavaTypes = 'Integer' | 'Double' | 'String' | 'java.util.Date'
type DatePrecisions = 'date' | 'datetime'

interface ValueSpec {
    value: number | string | Date;
    code: string;
    label: string;
}

interface FieldSpec {
    alias: string;
    javaType: JavaTypes;
    datePrecision?: DatePrecisions;
    values?: Record<string, ValueSpec>;
    getLabel?(value: number | string | Date): string | null;
    default?: number | string | Date;
    lengthInteger?: number;
    lengthFraction?: number;
    lengthString?: number;
    min?: number;
    max?: number;
    description: string;
    select?:Vue;//TODO
}

interface UniqueSpec {
    items: Array<string>;
    key: boolean;
    seq: boolean;
}

interface BeanSpec {
    table: string;
    view: string;
    name: string;
    fields: Record<string, FieldSpec>;
    uniques: Array<UniqueSpec>;
}

export {
  JavaTypes,
  DatePrecisions,
  ValueSpec,
  FieldSpec,
  BeanSpec,
};
