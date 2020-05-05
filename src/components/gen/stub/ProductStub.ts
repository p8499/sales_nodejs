import { FilterLogicExpr } from '../filter';
import { OrderByListExpr } from '../order';
import { ContentRange, deserializeContentRange } from '../range';
import {
  SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT, SERVER_APP, ServerError, parameters,
} from '../common';
import { ProductMask } from '../mask/ProductMask';
import { deserializeProduct, deserializeProductList, Product } from '../bean/Product';

const PATH = 'api/prod';
const LIST_PATH = 'api/prod_list';
const ATTACHMENT_PATH = 'api/prod_attachment';

async function getProduct(
  key: { imid: number },
  mask?: ProductMask,
): Promise<{ statusCode: number; product: Product }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.imid.toString()}${parameters(dict)}`, { method: 'GET', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      product: deserializeProduct(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function addProduct(bean: Product): Promise<{ statusCode: number; product: (Product) }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}`, { method: 'POST', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString() });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      product: deserializeProduct(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function updateProduct(bean: Product, mask?: ProductMask): Promise<{ statusCode: number; product: (Product) }> {
  const dict = Object();
  dict.mask = mask;
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${bean.imid !== null ? bean.imid.toString() : ''}${parameters(dict)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json;charset=UTF-8' }, body: bean.toString() });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      product: deserializeProduct(await response.text()),
    };
  }
  throw new ServerError(response.status);
}

async function deleteProduct(key: { imid: number }): Promise<{ statusCode: number; key: { imid: number } }> {
  const response = await fetch(`${SERVER_PROTOCOL}//${SERVER_HOST}:${SERVER_PORT.toString()}/${SERVER_APP}/${PATH}/${key.imid.toString()}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json;charset=UTF-8' } });
  if (response.status < 400) {
    return {
      statusCode: response.status,
      key: { imid: key.imid },
    };
  }
  throw new ServerError(response.status);
}

async function deleteProductSafely(
  key: { imid: number },
): Promise<{ statusCode: number; key: { imid: number } }> {
  try {
    return await deleteProduct(key);
  } catch (e) {
    return {
      statusCode: e.statusCode,
      key,
    };
  }
}

async function batchDeleteProduct(keys: Array<{ imid: number } >): Promise<Array<{ statusCode: number; key: { imid: number } }>> {
  return await Promise.all(keys.map((v) => deleteProductSafely(v)));
}

async function queryProduct(options: { filter?: FilterLogicExpr; orderBy?: OrderByListExpr; pageSize?: number; pageNumber?: number; mask?: ProductMask }): Promise<{ statusCode: number; list: Array<Product>; contentRange: ContentRange }> {
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
      list: deserializeProductList(await response.text()),
      contentRange: deserializeContentRange(response.headers.get('content-range') as string),
    };
  }
  throw new ServerError(response.status);
}

async function countProduct(options: {filter?: FilterLogicExpr}): Promise<{ statusCode: number; total: number }> {
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
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  deleteProductSafely,
  batchDeleteProduct,
  queryProduct,
  countProduct,
};
