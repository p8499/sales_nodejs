import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { RecordMask } from '../mask/RecordMask';
import { deserializeRecord, deserializeRecordList, Record } from '../bean/Record';

const PATH = 'api/recd';
const LIST_PATH = 'api/recd_list';
const ATTACHMENT_PATH = 'api/recd_attachment';

async function getRecord(
  key: { reid: number },
  mask?: RecordMask,
): Promise<{ statusCode: number; record: Record }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.reid.toString()}${parameters(dict)}`, { method: 'GET', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      record: deserializeRecord(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addRecord(bean: Record): Promise<{ statusCode: number; record: (Record) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}`, { method: 'POST', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString() });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      record: deserializeRecord(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateRecord(bean: Record, mask?: RecordMask): Promise<{ statusCode: number; record: (Record) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.reid !== null ? bean.reid.toString() : ''}${parameters(dict)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString() });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      record: deserializeRecord(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function deleteRecord(key: { reid: number }): Promise<{ statusCode: number; key: { reid: number } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.reid.toString()}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { reid: key.reid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteRecordSafely(
  key: { reid: number },
): Promise<{ statusCode: number; key: { reid: number } }> {
  try {
    return await deleteRecord(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteRecord(keys: Array<{ reid: number } >): Promise<Array<{ statusCode: number; key: { reid: number } }>> {
  return await Promise.all(keys.map((v) => deleteRecordSafely(v)));
}

async function queryRecord(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: RecordMask }): Promise<{ statusCode: number; list: Array<Record>; contentRange: ContentRange }> {
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
      list: deserializeRecordList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countRecord(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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
  getRecord,
  addRecord,
  updateRecord,
  deleteRecord,
  deleteRecordSafely,
  batchDeleteRecord,
  queryRecord,
  countRecord,
};
