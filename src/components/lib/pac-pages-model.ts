class PacPageObject {
    public items: Array<PacPageObject> = new Array<PacPageObject>();

    constructor(public name: string, public title: string = name) {
    }

    append(...items: Array<PacPageObject>): PacPageObject {
        this.items.push(...items);
        return this;
    }
}

class PacPagesModel {
    public objs: Array<PacPageObject> = new Array<PacPageObject>();

    append(...objs: Array<PacPageObject>): PacPagesModel {
        this.objs.push(...objs);
        return this;
    }

    compile(): PacPagesModel {
        this.a2d = {};
        this.d2a = {};
        for (const obj of this.objs)
            this.recvCompileA2D(obj);
        this.compileD2A();
        return this;
    }

    relation(ancestor: string, descendant: string): boolean {
        let current = descendant;
        while (Object.prototype.hasOwnProperty.call(this.d2a, current)) {
            current = this.d2a[current];
            if (ancestor === current)
                return true;
        }
        return false;
    }

    getTitle(name: string): string | undefined {
        if (Object.prototype.hasOwnProperty.call(this.titles, name))
            return this.titles[name];
        else
            return undefined;
    }

    private recvCompileA2D(obj: PacPageObject): void {
        if (Object.prototype.hasOwnProperty.call(this.a2d, obj.name))
            this.a2d[obj.name].push(...obj.items.map(v => v.name));
        else
            this.a2d[obj.name] = obj.items.map(v => v.name);
        this.titles[obj.name] = obj.title;
        for (const item of obj.items)
            this.recvCompileA2D(item);
    }

    private compileD2A(): void {
        for (const parent of Object.getOwnPropertyNames(this.a2d)) {
            const children = this.a2d[parent];
            for (const child of children)
                this.d2a[child] = parent;
        }
    }

    private a2d: Record<string, Array<string>> = {};
    private titles: Record<string, string> = {};
    private d2a: Record<string, string> = {};
}

export {
    PacPageObject,
    PacPagesModel
}