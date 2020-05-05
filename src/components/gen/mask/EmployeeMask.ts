import { Mask } from '../mask';

class EmployeeMask implements Mask {
        public mask: number;

        constructor(
          emid = false,
          emstatus = false,
          emgender = false,
          emname = false,
          emamount = false,
          embirthday = false,
        ) {
          this.mask = 0b000000;
          if (emid) { this.setEmid(emid); }
          if (emstatus) { this.setEmstatus(emstatus); }
          if (emgender) { this.setEmgender(emgender); }
          if (emname) { this.setEmname(emname); }
          if (emamount) { this.setEmamount(emamount); }
          if (embirthday) { this.setEmbirthday(embirthday); }
        }

        getEmid(): boolean {
          return (this.mask >> 5 & 1) === 1;
        }

        setEmid(emid: boolean): EmployeeMask {
          if (emid) this.mask |= 0b100000;
          else this.mask &= 0b011111;
          return this;
        }

        getEmstatus(): boolean {
          return (this.mask >> 4 & 1) === 1;
        }

        setEmstatus(emstatus: boolean): EmployeeMask {
          if (emstatus) this.mask |= 0b010000;
          else this.mask &= 0b101111;
          return this;
        }

        getEmgender(): boolean {
          return (this.mask >> 3 & 1) === 1;
        }

        setEmgender(emgender: boolean): EmployeeMask {
          if (emgender) this.mask |= 0b001000;
          else this.mask &= 0b110111;
          return this;
        }

        getEmname(): boolean {
          return (this.mask >> 2 & 1) === 1;
        }

        setEmname(emname: boolean): EmployeeMask {
          if (emname) this.mask |= 0b000100;
          else this.mask &= 0b111011;
          return this;
        }

        getEmamount(): boolean {
          return (this.mask >> 1 & 1) === 1;
        }

        setEmamount(emamount: boolean): EmployeeMask {
          if (emamount) this.mask |= 0b000010;
          else this.mask &= 0b111101;
          return this;
        }

        getEmbirthday(): boolean {
          return (this.mask >> 0 & 1) === 1;
        }

        setEmbirthday(embirthday: boolean): EmployeeMask {
          if (embirthday) this.mask |= 0b000001;
          else this.mask &= 0b111110;
          return this;
        }

        all(b: boolean): EmployeeMask {
          this.setEmid(b);
          this.setEmstatus(b);
          this.setEmgender(b);
          this.setEmname(b);
          this.setEmamount(b);
          this.setEmbirthday(b);
          return this;
        }

        keys(b: boolean): EmployeeMask {
          this.setEmid(b);
          return this;
        }

        attributes(b: boolean): EmployeeMask {
          this.setEmstatus(b);
          this.setEmgender(b);
          this.setEmname(b);
          this.setEmbirthday(b);
          return this;
        }

        physicals(b: boolean): EmployeeMask {
          this.setEmid(b);
          this.setEmstatus(b);
          this.setEmgender(b);
          this.setEmname(b);
          this.setEmbirthday(b);
          return this;
        }

        virtuals(b: boolean): EmployeeMask {
          this.setEmamount(b);
          return this;
        }

        get(p: string): boolean {
          switch (p) {
            case 'emid':
              return this.getEmid();
            case 'emstatus':
              return this.getEmstatus();
            case 'emgender':
              return this.getEmgender();
            case 'emname':
              return this.getEmname();
            case 'emamount':
              return this.getEmamount();
            case 'embirthday':
              return this.getEmbirthday();
          }
          return false;
        }

        set(p: string, b: boolean): EmployeeMask {
          switch (p) {
            case 'emid':
              this.setEmid(b);
              break;
            case 'emstatus':
              this.setEmstatus(b);
              break;
            case 'emgender':
              this.setEmgender(b);
              break;
            case 'emname':
              this.setEmname(b);
              break;
            case 'emamount':
              this.setEmamount(b);
              break;
            case 'embirthday':
              this.setEmbirthday(b);
              break;
          }
          return this;
        }

        toString(): string {
          return this.mask.toString();
        }
}

function deserializeEmployeeMask(str: string): EmployeeMask {
  try {
    const mask = new EmployeeMask();
    mask.mask = parseInt(str) & 0b111111;
    return mask;
  } catch {
    throw Error('Error deserializing EmployeeMask');
  }
}

export {
  EmployeeMask,
  deserializeEmployeeMask,
};
