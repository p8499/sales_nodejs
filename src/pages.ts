import {PacPageObject, PacPagesModel} from "@/components/lib/pac-pages-model";

export default new PacPagesModel().append(
    new PacPageObject('employee-list', '雇员清单')
        .append(new PacPageObject('employee-update', '雇员编辑'))
        .append(new PacPageObject('employee-add', '雇员新增'))
).compile();
