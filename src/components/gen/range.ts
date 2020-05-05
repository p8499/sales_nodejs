class ContentRange {
  constructor(public start: number = 0, public end: number = -1, public total: number = 0) {
  }

  pageNumber(pageSize: number): number {
    return Math.ceil((this.start + 1) / pageSize);
  }

  pageMax(pageSize: number): number {
    return Math.ceil(this.total / pageSize);
  }

  toString(): string {
    return `items ${this.start}-${this.end}/${this.total}`;
  }
}

function deserializeContentRange(str: string): ContentRange {
  try {
    const iblank = str.indexOf(' ');
    const idash = str.indexOf('-');
    const islash = str.indexOf('/');
    return new ContentRange(
      parseInt(str.substr(iblank + 1, idash - iblank - 1)),
      parseInt(str.substr(idash + 1, islash - idash - 1)),
      parseInt(str.substr(islash + 1)),
    );
  } catch {
    throw Error('Error deserializing ContentRange.');
  }
}

export { ContentRange, deserializeContentRange };
