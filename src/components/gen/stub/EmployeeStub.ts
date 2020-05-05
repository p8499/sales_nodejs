import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { EmployeeMask } from '../mask/EmployeeMask';
import { deserializeEmployee, deserializeEmployeeList, Employee } from '../bean/Employee';

const PATH = 'api/empl';
const LIST_PATH = 'api/empl_list';
const ATTACHMENT_PATH = 'api/empl_attachment';

async function getEmployee(
  key: { emid: number },
  mask?: EmployeeMask,
): Promise<{ statusCode: number; employee: Employee }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.emid.toString()}${parameters(dict)}`, { method: 'GET', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      employee: deserializeEmployee(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addEmployee(bean: Employee): Promise<{ statusCode: number; employee: (Employee) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.emid !== null ? bean.emid.toString() : ''}`, { method: 'POST', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString() });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      employee: deserializeEmployee(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateEmployee(bean: Employee, mask?: EmployeeMask): Promise<{ statusCode: number; employee: (Employee) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.emid !== null ? bean.emid.toString() : ''}${parameters(dict)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString() });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      employee: deserializeEmployee(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function deleteEmployee(key: { emid: number }): Promise<{ statusCode: number; key: { emid: number } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.emid.toString()}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { emid: key.emid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteEmployeeSafely(
  key: { emid: number },
): Promise<{ statusCode: number; key: { emid: number } }> {
  try {
    return await deleteEmployee(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteEmployee(keys: Array<{ emid: number } >): Promise<Array<{ statusCode: number; key: { emid: number } }>> {
  return await Promise.all(keys.map((v) => deleteEmployeeSafely(v)));
}

async function queryEmployee(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: EmployeeMask }): Promise<{ statusCode: number; list: Array<Employee>; contentRange: ContentRange }> {
  const pageSize = options.pageSize !== undefined ? options.pageSize : 10;
  const pageNumber = options.pageNumber !== undefined ? options.pageNumber : 1;
  const start = (pageNumber - 1) * pageSize;
  const end = pageNumber * pageSize - 1;
  const dict = Object();
  dict.orderBy = options.orderBy;
  dict.mask = options.mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${LIST_PATH}${parameters(dict)}`, { method: 'POST', headers: { 'Content-Type': 'application/json;charset=UTF-8', Range: `items=${start}-${end}` }, body: options.filter?.toString() });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      list: deserializeEmployeeList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countEmployee(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${LIST_PATH}`, { method: 'POST', headers: { 'Content-Type': 'application/json;charset=UTF-8', Range: 'items=items=1--1' }, body: options.filter?.toString() });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      total: deserializeContentRange(response.headers.get('content-range') as string).total,
    };
  }
  throw new ServerError(response.status);
}

// todo attachments
export {
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  deleteEmployeeSafely,
  batchDeleteEmployee,
  queryEmployee,
  countEmployee,
};
