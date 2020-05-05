import { EMPLOYEE_SPEC } from '../spec/EmployeeSpec';
import { EmployeeMask } from '../mask/EmployeeMask';
import { Bean } from '../bean';

import { formatDate, parseDate } from '../dateFormatter';

class Employee implements Bean {
  constructor(public emid: number|null = null, public emstatus: number|null = EMPLOYEE_SPEC.fields.emstatus.default, public emgender: string|null = null, public emname: string|null = null, public emamount: number|null = null, public embirthday: Date|null = null) {
  }

  equals(target: Employee, mask: EmployeeMask = new EmployeeMask(true, true, true, true, true, true)): boolean {
    return !(mask.getEmid() && !((this.emid === null && target.emid === null) || (this.emid !== null && target.emid !== null && this.emid === target.emid))) && !(mask.getEmstatus() && !((this.emstatus === null && target.emstatus === null) || (this.emstatus !== null && target.emstatus !== null && this.emstatus === target.emstatus))) && !(mask.getEmgender() && !((this.emgender === null && target.emgender === null) || (this.emgender !== null && target.emgender !== null && this.emgender === target.emgender))) && !(mask.getEmname() && !((this.emname === null && target.emname === null) || (this.emname !== null && target.emname !== null && this.emname === target.emname))) && !(mask.getEmamount() && !((this.emamount === null && target.emamount === null) || (this.emamount !== null && target.emamount !== null && this.emamount === target.emamount))) && !(mask.getEmbirthday() && !((this.embirthday === null && target.embirthday === null) || (this.embirthday !== null && target.embirthday !== null && this.embirthday.getTime() === target.embirthday.getTime())));
  }

  copy(target: Employee = new Employee(), mask: EmployeeMask = new EmployeeMask(true, true, true, true, true, true)): Employee {
    if (mask.getEmid()) { target.emid = this.emid; }
    if (mask.getEmstatus()) { target.emstatus = this.emstatus; }
    if (mask.getEmgender()) { target.emgender = this.emgender; }
    if (mask.getEmname()) { target.emname = this.emname; }
    if (mask.getEmamount()) { target.emamount = this.emamount; }
    if (mask.getEmbirthday()) { target.embirthday = this.embirthday; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.emid !== null) { texts.push(`"emid":${this.emid}`); }
    if (this.emstatus !== null) { texts.push(`"emstatus":${this.emstatus}`); }
    if (this.emgender !== null) { texts.push(`"emgender":"${this.emgender}"`); }
    if (this.emname !== null) { texts.push(`"emname":"${this.emname}"`); }
    if (this.emamount !== null) { texts.push(`"emamount":${this.emamount}`); }
    if (this.embirthday !== null) { texts.push(`"embirthday":"${formatDate(this.embirthday)}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeEmployee(str: string): Employee {
  try {
    const obj = JSON.parse(str);
    return new Employee(
      'emid' in obj ? obj.emid : null,
      'emstatus' in obj ? obj.emstatus : null,
      'emgender' in obj ? obj.emgender : null,
      'emname' in obj ? obj.emname : null,
      'emamount' in obj ? obj.emamount : null,
      'embirthday' in obj ? parseDate(obj.embirthday) : null,
    );
  } catch {
    throw Error('Error deserializing Employee');
  }
}

function deserializeEmployeeList(str: string): Array<Employee> {
  try {
    return JSON.parse(str).map((obj: any) => new Employee(
      'emid' in obj ? obj.emid : null,
      'emstatus' in obj ? obj.emstatus : null,
      'emgender' in obj ? obj.emgender : null,
      'emname' in obj ? obj.emname : null,
      'emamount' in obj ? obj.emamount : null,
      'embirthday' in obj ? parseDate(obj.embirthday) : null,
    ));
  } catch {
    throw Error('Error deserializing EmployeeList');
  }
}

export {
  Employee,
  deserializeEmployee,
  deserializeEmployeeList,
};
