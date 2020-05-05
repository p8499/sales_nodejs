import { Mask } from '../mask';

class RecordMask implements Mask {
        public mask: number;

        constructor(
          reid = false,
          reimid = false,
          reemid = false,
          reqty = false,
          recreated = false,
        ) {
          this.mask = 0b00000;
          if (reid) { this.setReid(reid); }
          if (reimid) { this.setReimid(reimid); }
          if (reemid) { this.setReemid(reemid); }
          if (reqty) { this.setReqty(reqty); }
          if (recreated) { this.setRecreated(recreated); }
        }

        getReid(): boolean {
          return (this.mask >> 4 & 1) === 1;
        }

        setReid(reid: boolean): RecordMask {
          if (reid) this.mask |= 0b10000;
          else this.mask &= 0b01111;
          return this;
        }

        getReimid(): boolean {
          return (this.mask >> 3 & 1) === 1;
        }

        setReimid(reimid: boolean): RecordMask {
          if (reimid) this.mask |= 0b01000;
          else this.mask &= 0b10111;
          return this;
        }

        getReemid(): boolean {
          return (this.mask >> 2 & 1) === 1;
        }

        setReemid(reemid: boolean): RecordMask {
          if (reemid) this.mask |= 0b00100;
          else this.mask &= 0b11011;
          return this;
        }

        getReqty(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setReqty(reqty: boolean): RecordMask {
          if (reqty) this.mask |= 0b00010;
          else this.mask &= 0b11101;
          return this;
        }

        getRecreated(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setRecreated(recreated: boolean): RecordMask {
          if (recreated) this.mask |= 0b00001;
          else this.mask &= 0b11110;
          return this;
        }

        all(b: boolean): RecordMask {
          this.setReid(b);
          this.setReimid(b);
          this.setReemid(b);
          this.setReqty(b);
          this.setRecreated(b);
          return this;
        }

        keys(b: boolean): RecordMask {
          this.setReid(b);
          return this;
        }

        attributes(b: boolean): RecordMask {
          this.setReimid(b);
          this.setReemid(b);
          this.setReqty(b);
          this.setRecreated(b);
          return this;
        }

        physicals(b: boolean): RecordMask {
          this.setReid(b);
          this.setReimid(b);
          this.setReemid(b);
          this.setReqty(b);
          this.setRecreated(b);
          return this;
        }

        virtuals(b: boolean): RecordMask {
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'reid':
              return this.getReid();
            case 'reimid':
              return this.getReimid();
            case 'reemid':
              return this.getReemid();
            case 'reqty':
              return this.getReqty();
            case 'recreated':
              return this.getRecreated();
          }
          return false;
        }

        set(p: string, b: boolean): RecordMask {
          switch (p) {
            case 'reid':
              this.setReid(b);
              break;
            case 'reimid':
              this.setReimid(b);
              break;
            case 'reemid':
              this.setReemid(b);
              break;
            case 'reqty':
              this.setReqty(b);
              break;
            case 'recreated':
              this.setRecreated(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeRecordMask(str: string): RecordMask {
  try {
    const mask = new RecordMask();
    mask.mask = parseInt(str) & 0b11111;
    return mask;
  } catch {
    throw Error('Error deserializing RecordMask');
  }
}

export {
  RecordMask,
  deserializeRecordMask,
};
