import { Mask } from './mask';

interface Bean {
    equals(target: Bean, mask?: Mask): boolean
    copy(target?: Bean, mask?: Mask): Bean;
}

export {
  Bean,
};
