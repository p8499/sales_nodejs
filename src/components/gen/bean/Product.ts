import { PRODUCT_SPEC } from '../spec/ProductSpec';
import { ProductMask } from '../mask/ProductMask';
import { Bean } from '../bean';


class Product implements Bean {
  constructor(public imid: number|null = null, public imname: string|null = null, public imprice: number|null = PRODUCT_SPEC.fields.imprice.default, public imamount: number|null = null) {
  }

  equals(target: Product, mask: ProductMask = new ProductMask(true, true, true, true)): boolean {
    return !(mask.getImid() && !((this.imid === null && target.imid === null) || (this.imid !== null && target.imid !== null && this.imid === target.imid))) && !(mask.getImname() && !((this.imname === null && target.imname === null) || (this.imname !== null && target.imname !== null && this.imname === target.imname))) && !(mask.getImprice() && !((this.imprice === null && target.imprice === null) || (this.imprice !== null && target.imprice !== null && this.imprice === target.imprice))) && !(mask.getImamount() && !((this.imamount === null && target.imamount === null) || (this.imamount !== null && target.imamount !== null && this.imamount === target.imamount)));
  }

  copy(target: Product = new Product(), mask: ProductMask = new ProductMask(true, true, true, true)): Product {
    if (mask.getImid()) { target.imid = this.imid; }
    if (mask.getImname()) { target.imname = this.imname; }
    if (mask.getImprice()) { target.imprice = this.imprice; }
    if (mask.getImamount()) { target.imamount = this.imamount; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.imid !== null) { texts.push(`"imid":${this.imid}`); }
    if (this.imname !== null) { texts.push(`"imname":"${this.imname}"`); }
    if (this.imprice !== null) { texts.push(`"imprice":${this.imprice}`); }
    if (this.imamount !== null) { texts.push(`"imamount":${this.imamount}`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeProduct(str: string): Product {
  try {
    const obj = JSON.parse(str);
    return new Product(
      'imid' in obj ? obj.imid : null,
      'imname' in obj ? obj.imname : null,
      'imprice' in obj ? obj.imprice : null,
      'imamount' in obj ? obj.imamount : null,
    );
  } catch {
    throw Error('Error deserializing Product');
  }
}

function deserializeProductList(str: string): Array<Product> {
  try {
    return JSON.parse(str).map((obj: any) => new Product(
      'imid' in obj ? obj.imid : null,
      'imname' in obj ? obj.imname : null,
      'imprice' in obj ? obj.imprice : null,
      'imamount' in obj ? obj.imamount : null,
    ));
  } catch {
    throw Error('Error deserializing ProductList');
  }
}

export {
  Product,
  deserializeProduct,
  deserializeProductList,
};
