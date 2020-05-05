import {Vue} from "vue-property-decorator";

type PacErrorMessage = { subject: string; content: string | null }

class PacErrorObj {
    public paths: Array<string>;

    constructor(public id: string,
                public message: string | PacErrorMessage | null = null,
                public path: string | null = null) {
        this.paths = path !== null ? [path] : [];
    }

    wrap(path: string): PacErrorObj {
        this.paths = [path, ...this.paths];
        return this;
    }
}

type PacErrorModel = { id: string; message: PacErrorMessage; paths: Array<string>; expanded: boolean }

class PacErrorsModel {
    constructor(
        public errors: Array<PacErrorModel> = []) {

    }

    set(errorObj: PacErrorObj) {
        const index = this.errors.findIndex(v => v.id === errorObj.id);
        if (errorObj.message !== null)
            if (index > -1)
                Vue.set(this.errors, index, {
                    id: errorObj.id,
                    message: typeof (errorObj.message) === 'string' ? {
                        subject: errorObj.message,
                        content: null
                    } : errorObj.message,
                    paths: errorObj.paths,
                    expanded: false
                });
            else
                this.errors.push({
                    id: errorObj.id,
                    message: typeof (errorObj.message) === 'string' ? {
                        subject: errorObj.message,
                        content: null
                    } : errorObj.message,
                    paths: errorObj.paths,
                    expanded: false
                });
        else
            Vue.delete(this.errors, index);
    }
}

export {
    PacErrorObj,
    PacErrorModel,
    PacErrorsModel
}