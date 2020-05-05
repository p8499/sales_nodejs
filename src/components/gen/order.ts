class OrderByExpr {
  constructor(public field: string, public asc: boolean = true) {
  }

  only(): OrderByListExpr {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return new OrderByListExpr().append(this);
  }

  toString(): string {
    return `${this.asc ? '' : '-'}${this.field}`;
  }
}

class OrderByListExpr {
    public specs: Array<OrderByExpr>;

    constructor(...specs: Array<OrderByExpr>) {
      this.specs = specs;
    }

    append(...specs: Array<OrderByExpr>): OrderByListExpr {
      this.specs.push(...specs);
      return this;
    }

    toString(): string {
      return this.specs.join(',');
    }
}

function deserializeOrderByExpr(str: string): OrderByExpr {
  try {
    return new OrderByExpr(str.charAt(0) === '-' ? str.substring(1).trim() : str.trim(), str.charAt(0) !== '-');
  } catch {
    throw Error('Error deserializing OrderByExpr.');
  }
}

function deserializeOrderByListExpr(str: string): OrderByListExpr {
  const ss = str.split(',');
  try {
    const expr = new OrderByListExpr();
    for (const s of ss) { expr.append(deserializeOrderByExpr(s)); }
    return expr;
  } catch {
    throw Error('Error deserializing OrderByListExpr.');
  }
}

export {
  OrderByExpr,
  OrderByListExpr,
  deserializeOrderByExpr,
  deserializeOrderByListExpr,
};
