import { BeanSpec, JavaTypes, DatePrecisions } from '../spec';

class RecordSpec implements BeanSpec {
    table = 'F4211';

    view = 'F4211VIEW';

    name = 'RECD';

    fields = {
      reid: {
        alias: 'REID',
        javaType: 'Integer' as JavaTypes,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: 'Record ID',
      },
      reimid: {
        alias: 'REIMID',
        javaType: 'Integer' as JavaTypes,
        lengthInteger: 8,
        lengthFraction: 0,
        min: -99999999,
        max: 99999999,
        description: 'Product ID',
      },
      reemid: {
        alias: 'REEMID',
        javaType: 'Integer' as JavaTypes,
        lengthInteger: 4,
        lengthFraction: 0,
        min: -9999,
        max: 9999,
        description: 'Employee ID',
      },
      reqty: {
        alias: 'REQTY',
        javaType: 'Integer' as JavaTypes,
        default: 1,
        lengthInteger: 4,
        lengthFraction: 0,
        min: -9999,
        max: 9999,
        description: 'Quantity',
      },
      recreated: {
        alias: 'RECREATED',
        javaType: 'java.util.Date' as JavaTypes,
        datePrecision: 'datetime' as DatePrecisions,
        description: 'Created Time',
      },
    };

    uniques = [
      {
        items: [
          'reid',
        ],
        key: true,
        seq: true,
      },
    ];
}

const RECORD_SPEC = new RecordSpec();

export { RECORD_SPEC };
