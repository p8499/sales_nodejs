import { Mask } from '../mask';

class ProductMask implements Mask {
        public mask: number;

        constructor(
          imid = false,
          imname = false,
          imprice = false,
          imamount = false,
        ) {
          this.mask = 0b0000;
          if (imid) { this.setImid(imid); }
          if (imname) { this.setImname(imname); }
          if (imprice) { this.setImprice(imprice); }
          if (imamount) { this.setImamount(imamount); }
        }

        getImid(): boolean {
          return (this.mask >> 3 & 1) === 1;
        }

        setImid(imid: boolean): ProductMask {
          if (imid) this.mask |= 0b1000;
          else this.mask &= 0b0111;
          return this;
        }

        getImname(): boolean {
          return (this.mask >> 2 & 1) === 1;
        }

        setImname(imname: boolean): ProductMask {
          if (imname) this.mask |= 0b0100;
          else this.mask &= 0b1011;
          return this;
        }

        getImprice(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setImprice(imprice: boolean): ProductMask {
          if (imprice) this.mask |= 0b0010;
          else this.mask &= 0b1101;
          return this;
        }

        getImamount(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setImamount(imamount: boolean): ProductMask {
          if (imamount) this.mask |= 0b0001;
          else this.mask &= 0b1110;
          return this;
        }

        all(b: boolean): ProductMask {
          this.setImid(b);
          this.setImname(b);
          this.setImprice(b);
          this.setImamount(b);
          return this;
        }

        keys(b: boolean): ProductMask {
          this.setImid(b);
          return this;
        }

        attributes(b: boolean): ProductMask {
          this.setImname(b);
          this.setImprice(b);
          return this;
        }

        physicals(b: boolean): ProductMask {
          this.setImid(b);
          this.setImname(b);
          this.setImprice(b);
          return this;
        }

        virtuals(b: boolean): ProductMask {
          this.setImamount(b);
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'imid':
              return this.getImid();
            case 'imname':
              return this.getImname();
            case 'imprice':
              return this.getImprice();
            case 'imamount':
              return this.getImamount();
          }
          return false;
        }

        set(p: string, b: boolean): ProductMask {
          switch (p) {
            case 'imid':
              this.setImid(b);
              break;
            case 'imname':
              this.setImname(b);
              break;
            case 'imprice':
              this.setImprice(b);
              break;
            case 'imamount':
              this.setImamount(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeProductMask(str: string): ProductMask {
  try {
    const mask = new ProductMask();
    mask.mask = parseInt(str) & 0b1111;
    return mask;
  } catch {
    throw Error('Error deserializing ProductMask');
  }
}

export {
  ProductMask,
  deserializeProductMask,
};
