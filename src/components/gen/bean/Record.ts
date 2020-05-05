import { RECORD_SPEC } from '../spec/RecordSpec';
import { RecordMask } from '../mask/RecordMask';
import { Bean } from '../bean';

import { formatDateTime, parseDateTime } from '../dateFormatter';

class Record implements Bean {
  constructor(public reid: number|null = null, public reimid: number|null = null, public reemid: number|null = null, public reqty: number|null = RECORD_SPEC.fields.reqty.default, public recreated: Date|null = null) {
  }

  equals(target: Record, mask: RecordMask = new RecordMask(true, true, true, true, true)): boolean {
    return !(mask.getReid() && !((this.reid === null && target.reid === null) || (this.reid !== null && target.reid !== null && this.reid === target.reid))) && !(mask.getReimid() && !((this.reimid === null && target.reimid === null) || (this.reimid !== null && target.reimid !== null && this.reimid === target.reimid))) && !(mask.getReemid() && !((this.reemid === null && target.reemid === null) || (this.reemid !== null && target.reemid !== null && this.reemid === target.reemid))) && !(mask.getReqty() && !((this.reqty === null && target.reqty === null) || (this.reqty !== null && target.reqty !== null && this.reqty === target.reqty))) && !(mask.getRecreated() && !((this.recreated === null && target.recreated === null) || (this.recreated !== null && target.recreated !== null && this.recreated.getTime() === target.recreated.getTime())));
  }

  copy(target: Record = new Record(), mask: RecordMask = new RecordMask(true, true, true, true, true)): Record {
    if (mask.getReid()) { target.reid = this.reid; }
    if (mask.getReimid()) { target.reimid = this.reimid; }
    if (mask.getReemid()) { target.reemid = this.reemid; }
    if (mask.getReqty()) { target.reqty = this.reqty; }
    if (mask.getRecreated()) { target.recreated = this.recreated; }
    return target;
  }

  toString(): string {
    const texts: Array<string> = [];
    if (this.reid !== null) { texts.push(`"reid":${this.reid}`); }
    if (this.reimid !== null) { texts.push(`"reimid":${this.reimid}`); }
    if (this.reemid !== null) { texts.push(`"reemid":${this.reemid}`); }
    if (this.reqty !== null) { texts.push(`"reqty":${this.reqty}`); }
    if (this.recreated !== null) { texts.push(`"recreated":"${formatDateTime(this.recreated)}"`); }
    return `{${texts.join(',')}}`;
  }
}

function deserializeRecord(str: string): Record {
  try {
    const obj = JSON.parse(str);
    return new Record(
      'reid' in obj ? obj.reid : null,
      'reimid' in obj ? obj.reimid : null,
      'reemid' in obj ? obj.reemid : null,
      'reqty' in obj ? obj.reqty : null,
      'recreated' in obj ? parseDateTime(obj.recreated) : null,
    );
  } catch {
    throw Error('Error deserializing Record');
  }
}

function deserializeRecordList(str: string): Array<Record> {
  try {
    return JSON.parse(str).map((obj: any) => new Record(
      'reid' in obj ? obj.reid : null,
      'reimid' in obj ? obj.reimid : null,
      'reemid' in obj ? obj.reemid : null,
      'reqty' in obj ? obj.reqty : null,
      'recreated' in obj ? parseDateTime(obj.recreated) : null,
    ));
  } catch {
    throw Error('Error deserializing RecordList');
  }
}

export {
  Record,
  deserializeRecord,
  deserializeRecordList,
};
