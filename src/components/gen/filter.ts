import { formatDate, formatDateTime } from './dateFormatter';

const OP_FIELD = 'field';
const OP_DATEFIELD = 'datefield';
const OP_DATETIMEFIELD = 'datetimefield';
const OP_BEAN = 'bean';
const OP_STRING = 'string';
const OP_NUMBER = 'number';
const OP_DATE = 'date';
const OP_DATETIME = 'datetime';

const OP_EQUAL = 'equal';
const OP_GREATER = 'greater';
const OP_LESS = 'less';
const OP_GREATEREQUAL = 'greaterEqual';
const OP_LESSEQUAL = 'lessEqual';
const OP_ISEMPTY = 'isEmpty';
const OP_CONTAIN = 'contain';
const OP_STARTWITH = 'startWith';
const OP_ENDWITH = 'endWith';
const OP_EXISTS = 'exists';

const OP_AND = 'and';
const OP_OR = 'or';
const OP_NOT = 'not';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FilterExpr {
}

class FilterOperandExpr implements FilterExpr {
  constructor(public op: string, public data: string) {
  }

  toString(): string {
    return `{"o":"${this.op === OP_FIELD ? 'o' : this.op === OP_DATEFIELD ? 'p' : this.op === OP_DATETIMEFIELD ? 'q' : this.op === OP_BEAN ? 'r' : this.op === OP_STRING ? 's' : this.op === OP_NUMBER ? 't' : this.op === OP_DATE ? 'u' : this.op === OP_DATETIME ? 'v' : this.op}","d":"${this.data}"}`;
  }
}

class FilterConditionExpr implements FilterExpr {
    public data: Array<FilterExpr>;

    constructor(public op: string, ...data: Array<FilterExpr>) {
      this.data = data;
    }

    not(): FilterLogicExpr {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return new FilterLogicExpr(OP_NOT, this);
    }

    toString(): string {
      return `{"o":"${this.op === OP_EQUAL ? 'd' : this.op === OP_GREATER ? 'e' : this.op === OP_LESS ? 'f' : this.op === OP_GREATEREQUAL ? 'g' : this.op === OP_LESSEQUAL ? 'h' : this.op === OP_ISEMPTY ? 'i' : this.op === OP_CONTAIN ? 'j' : this.op === OP_STARTWITH ? 'k' : this.op === OP_ENDWITH ? 'l' : this.op === OP_EXISTS ? 'm' : this.op}","d":[${this.data.join(',')}]}`;
    }
}

function equalsString(field: string, value: string): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_FIELD, field);
  const operand2 = new FilterOperandExpr(OP_STRING, value);
  return new FilterConditionExpr(OP_EQUAL, operand1, operand2);
}

function containsString(field: string, value: string): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_FIELD, field);
  const operand2 = new FilterOperandExpr(OP_STRING, value);
  return new FilterConditionExpr(OP_CONTAIN, operand1, operand2);
}


function startString(field: string, value: string): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_FIELD, field);
  const operand2 = new FilterOperandExpr(OP_STRING, value);
  return new FilterConditionExpr(OP_STARTWITH, operand1, operand2);
}

function endString(field: string, value: string): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_FIELD, field);
  const operand2 = new FilterOperandExpr(OP_STRING, value);
  return new FilterConditionExpr(OP_ENDWITH, operand1, operand2);
}

function equalsDate(field: string, value: Date): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_DATEFIELD, field);
  const operand2 = new FilterOperandExpr(OP_DATE, formatDate(value));
  return new FilterConditionExpr(OP_EQUAL, operand1, operand2);
}

function gtDate(field: string, value: Date): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_DATEFIELD, field);
  const operand2 = new FilterOperandExpr(OP_DATE, formatDate(value));
  return new FilterConditionExpr(OP_GREATER, operand1, operand2);
}

function geDate(field: string, value: Date): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_DATEFIELD, field);
  const operand2 = new FilterOperandExpr(OP_DATE, formatDate(value));
  return new FilterConditionExpr(OP_GREATEREQUAL, operand1, operand2);
}

function ltDate(field: string, value: Date): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_DATEFIELD, field);
  const operand2 = new FilterOperandExpr(OP_DATE, formatDate(value));
  return new FilterConditionExpr(OP_LESS, operand1, operand2);
}

function leDate(field: string, value: Date): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_DATEFIELD, field);
  const operand2 = new FilterOperandExpr(OP_DATE, formatDate(value));
  return new FilterConditionExpr(OP_LESSEQUAL, operand1, operand2);
}

function equalsDateTime(field: string, value: Date): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_DATETIMEFIELD, field);
  const operand2 = new FilterOperandExpr(OP_DATETIME, formatDateTime(value));
  return new FilterConditionExpr(OP_EQUAL, operand1, operand2);
}

function gtDateTime(field: string, value: Date): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_DATETIMEFIELD, field);
  const operand2 = new FilterOperandExpr(OP_DATETIME, formatDateTime(value));
  return new FilterConditionExpr(OP_GREATER, operand1, operand2);
}

function geDateTime(field: string, value: Date): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_DATETIMEFIELD, field);
  const operand2 = new FilterOperandExpr(OP_DATETIME, formatDateTime(value));
  return new FilterConditionExpr(OP_GREATEREQUAL, operand1, operand2);
}

function ltDateTime(field: string, value: Date): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_DATETIMEFIELD, field);
  const operand2 = new FilterOperandExpr(OP_DATETIME, formatDateTime(value));
  return new FilterConditionExpr(OP_LESS, operand1, operand2);
}

function leDateTime(field: string, value: Date): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_DATETIMEFIELD, field);
  const operand2 = new FilterOperandExpr(OP_DATETIME, formatDateTime(value));
  return new FilterConditionExpr(OP_LESSEQUAL, operand1, operand2);
}

function equalsNumber(field: string, value: number): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_FIELD, field);
  const operand2 = new FilterOperandExpr(OP_NUMBER, value.toString());
  return new FilterConditionExpr(OP_EQUAL, operand1, operand2);
}

function gtNumber(field: string, value: number): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_FIELD, field);
  const operand2 = new FilterOperandExpr(OP_NUMBER, value.toString());
  return new FilterConditionExpr(OP_GREATER, operand1, operand2);
}

function geNumber(field: string, value: number): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_FIELD, field);
  const operand2 = new FilterOperandExpr(OP_NUMBER, value.toString());
  return new FilterConditionExpr(OP_GREATEREQUAL, operand1, operand2);
}

function ltNumber(field: string, value: number): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_FIELD, field);
  const operand2 = new FilterOperandExpr(OP_NUMBER, value.toString());
  return new FilterConditionExpr(OP_LESS, operand1, operand2);
}

function leNumber(field: string, value: number): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_FIELD, field);
  const operand2 = new FilterOperandExpr(OP_NUMBER, value.toString());
  return new FilterConditionExpr(OP_LESSEQUAL, operand1, operand2);
}

function isEmpty(field: string): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_FIELD, field);
  return new FilterConditionExpr(OP_ISEMPTY, operand1);
}

function equalsField(field1: string, field2: string): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_FIELD, field1);
  const operand2 = new FilterOperandExpr(OP_FIELD, field2);
  return new FilterConditionExpr(OP_EQUAL, operand1, operand2);
}

function existsObject(obj: string, expr: FilterLogicExpr): FilterConditionExpr {
  const operand1 = new FilterOperandExpr(OP_BEAN, obj);
  return new FilterConditionExpr(OP_EXISTS, operand1, expr);
}

class FilterLogicExpr implements FilterExpr {
    public data: Array<FilterExpr>;

    constructor(public op: string = OP_AND, ...data: Array<FilterExpr>) {
      this.data = data;
    }

    not(): FilterLogicExpr {
      return new FilterLogicExpr(OP_NOT, this);
    }

    append(...data: Array<FilterExpr>): FilterLogicExpr {
      this.data.push(...data);
      return this;
    }

    equalsString(field: string, value: string) {
      return this.append(equalsString(field, value));
    }

    containsString(field: string, value: string) {
      return this.append(containsString(field, value));
    }

    startString(field: string, value: string) {
      return this.append(startString(field, value));
    }

    endString(field: string, value: string) {
      return this.append(endString(field, value));
    }

    equalsDate(field: string, value: Date) {
      return this.append(equalsDate(field, value));
    }

    gtDate(field: string, value: Date) {
      return this.append(gtDate(field, value));
    }

    geDate(field: string, value: Date) {
      return this.append(geDate(field, value));
    }

    ltDate(field: string, value: Date) {
      return this.append(ltDate(field, value));
    }

    leDate(field: string, value: Date) {
      return this.append(leDate(field, value));
    }

    equalsDateTime(field: string, value: Date) {
      return this.append(equalsDateTime(field, value));
    }

    gtDateTime(field: string, value: Date) {
      return this.append(gtDateTime(field, value));
    }

    geDateTime(field: string, value: Date) {
      return this.append(geDateTime(field, value));
    }

    ltDateTime(field: string, value: Date) {
      return this.append(ltDateTime(field, value));
    }

    leDateTime(field: string, value: Date) {
      return this.append(leDateTime(field, value));
    }

    equalsNumber(field: string, value: number) {
      return this.append(equalsNumber(field, value));
    }

    gtNumber(field: string, value: number) {
      return this.append(gtNumber(field, value));
    }

    geNumber(field: string, value: number) {
      return this.append(geNumber(field, value));
    }

    ltNumber(field: string, value: number) {
      return this.append(ltNumber(field, value));
    }

    leNumber(field: string, value: number) {
      return this.append(leNumber(field, value));
    }

    isEmpty(field: string) {
      return this.append(isEmpty(field));
    }

    equalsField(field1: string, field2: string) {
      return this.append(equalsField(field1, field2));
    }

    existsObject(obj: string, expr: FilterLogicExpr) {
      return this.append(existsObject(obj, expr));
    }

    toString(): string {
      return `{"o":"${this.op === OP_AND ? 'a' : this.op === OP_OR ? 'b' : this.op === OP_NOT ? 'c' : this.op}","d":[${this.data.join(',')}]}`;
    }
}

function deserializeFilterExpr(str: string): FilterExpr {
  const decompress = (obj: any): FilterExpr => {
    if (['a', 'b', 'c'].includes(obj.o)) {
      const op = obj.o === 'a' ? OP_AND : obj.o === 'b' ? OP_OR : obj.o === 'c' ? OP_NOT : obj.o;
      const data = Array.isArray(obj.d) ? obj.d.map((value: any) => decompress(value)) : [];
      return new FilterLogicExpr(op, ...data);
    } if (['d', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'].includes(obj.o)) {
      const op = obj.o === 'd' ? OP_EQUAL : obj.o === 'e' ? OP_GREATER : obj.o === 'f' ? OP_LESS : obj.o === 'g' ? OP_GREATEREQUAL : obj.o === 'h' ? OP_LESSEQUAL : obj.o === 'i' ? OP_ISEMPTY : obj.o === 'j' ? OP_CONTAIN : obj.o === 'k' ? OP_STARTWITH : obj.o === 'l' ? OP_ENDWITH : obj.o === 'm' ? OP_EXISTS : obj.o;
      const data = Array.isArray(obj.d) ? obj.d.map((value: any) => decompress(value)) : [];
      return new FilterConditionExpr(op, ...data);
    } if (['o', 'p', 'q', 'r', 's', 't', 'u', 'v'].includes(obj.o)) {
      const op = obj.o === 'o' ? OP_FIELD : obj.o === 'p' ? OP_DATEFIELD : obj.o === 'q' ? OP_DATETIMEFIELD : obj.o === 'r' ? OP_BEAN : obj.o === 's' ? OP_STRING : obj.o === 't' ? OP_NUMBER : obj.o === 'u' ? OP_DATE : obj.o === 'v' ? OP_DATETIME : obj.o;
      const data = obj.d;
      return new FilterOperandExpr(op, data);
    } throw Error(`${obj.o} is not recognized.`);
  };
  try {
    return decompress(JSON.parse(str));
  } catch {
    return Error('Error deserializing FilterExpr.');
  }
}

export {
  OP_FIELD,
  OP_DATEFIELD,
  OP_DATETIMEFIELD,
  OP_BEAN,
  OP_STRING,
  OP_NUMBER,
  OP_DATE,
  OP_DATETIME,
  OP_EQUAL,
  OP_GREATER,
  OP_LESS,
  OP_GREATEREQUAL,
  OP_LESSEQUAL,
  OP_ISEMPTY,
  OP_CONTAIN,
  OP_STARTWITH,
  OP_ENDWITH,
  OP_EXISTS,
  OP_AND,
  OP_OR,
  OP_NOT,
  FilterExpr,
  FilterOperandExpr,
  FilterConditionExpr,
  FilterLogicExpr,
  equalsString,
  containsString,
  startString,
  endString,
  equalsDate,
  gtDate,
  geDate,
  ltDate,
  leDate,
  equalsDateTime,
  gtDateTime,
  geDateTime,
  ltDateTime,
  leDateTime,
  equalsNumber,
  gtNumber,
  geNumber,
  ltNumber,
  leNumber,
  isEmpty,
  equalsField,
  existsObject,
  deserializeFilterExpr,
};
