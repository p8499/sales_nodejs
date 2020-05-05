interface Mask {
    all(b: boolean): Mask;

    keys(b: boolean): Mask;

    attributes(b: boolean): Mask;

    physicals(b: boolean): Mask;

    virtuals(b: boolean): Mask;

    get(p: string): boolean;

    set(p: string, b: boolean): Mask;
}

export {
  Mask,
};
