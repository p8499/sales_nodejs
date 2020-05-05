import { BeanSpec, JavaTypes, DatePrecisions } from '../spec';

class EmployeeSpec implements BeanSpec {
    table = 'F0101';

    view = 'F0101VIEW';

    name = 'EMPL';

    fields = {
      emid: {
        alias: 'EMID',
        javaType: 'Integer' as JavaTypes,
        lengthInteger: 4,
        lengthFraction: 0,
        min: -9999,
        max: 9999,
        description: 'Employee ID',
      },
      emstatus: {
        alias: 'EMSTATUS',
        javaType: 'Integer' as JavaTypes,
        values: {
          VALID: {
            value: 0,
            code: 'VALID',
            label: 'Valid',
          },
          INVALID: {
            value: 1,
            code: 'INVALID',
            label: 'Invalid',
          },
        },
        getLabel(value: number | string | Date): string | null {
          switch (value) {
            case 0:
              return 'Valid';
            case 1:
              return 'Invalid';
            default:
              return null;
          }
        },
        default: 0,
        lengthInteger: 1,
        lengthFraction: 0,
        min: -9,
        max: 9,
        description: 'Employee Status',
      },
      emgender: {
        alias: 'EMGENDER',
        javaType: 'String' as JavaTypes,
        values: {
          MALE: {
            value: 'M',
            code: 'MALE',
            label: 'Male',
          },
          FEMALE: {
            value: 'F',
            code: 'FEMALE',
            label: 'Female',
          },
        },
        getLabel(value: number | string | Date): string | null {
          switch (value) {
            case 'M':
              return 'Male';
            case 'F':
              return 'Female';
            default:
              return null;
          }
        },
        lengthString: 1,
        description: 'Employee Gender',
      },
      emname: {
        alias: 'EMNAME',
        javaType: 'String' as JavaTypes,
        lengthString: 64,
        description: 'Employee Name',
      },
      emamount: {
        alias: 'EMAMOUNT',
        javaType: 'Double' as JavaTypes,
        lengthInteger: 10,
        lengthFraction: 2,
        min: -9999999999.99,
        max: 9999999999.99,
        description: 'Total Sales Amount',
      },
      embirthday: {
        alias: 'EMBIRTHDAY',
        javaType: 'java.util.Date' as JavaTypes,
        datePrecision: 'date' as DatePrecisions,
        description: 'Employee Birthday',
      },
    };

    uniques = [
      {
        items: [
          'emid',
        ],
        key: true,
        seq: false,
      },
    ];
}

const EMPLOYEE_SPEC = new EmployeeSpec();

export { EMPLOYEE_SPEC };
