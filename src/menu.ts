import {PacMenuItemModel} from "@/components/lib/pac-menu/pac-menu-model";

export default [
    new PacMenuItemModel('DEMO系统').append(
        new PacMenuItemModel('雇员管理').append(
            new PacMenuItemModel('雇员列表', '/employee-list')
        ),
        new PacMenuItemModel('销售管理').append(
            new PacMenuItemModel('订单列表', '/order-list')
        ),
    )
];