import {BeanSpec, JavaTypes} from "../spec";

class ProductSpec implements BeanSpec{
    table = 'F4101';
    view = 'F4101VIEW';
    name = 'PROD';
    fields = {
                            imid: {
                alias: 'IMID',
                javaType: 'Integer' as JavaTypes,                                                                      lengthInteger: 8,
                    lengthFraction: 0,
                                                     min: -99999999,
                    max: 99999999,
                                                description: 'Product ID'             }
                            ,
                                imname: {
                alias: 'IMNAME',
                javaType: 'String' as JavaTypes,                                                                     lengthString: 64,
                                                                description: 'Product Name'             }
                            ,
                                imprice: {
                alias: 'IMPRICE',
                javaType: 'Double' as JavaTypes,                                                      default:                                             0.00                     ,
                                                    lengthInteger: 6,
                    lengthFraction: 2,
                                                    min: -999999.99,
                    max: 999999.99,
                                                description: 'Product Price'             }
                            ,
                                imamount: {
                alias: 'IMAMOUNT',
                javaType: 'Double' as JavaTypes,                                                                     lengthInteger: 0,
                    lengthFraction: 0,
                                                    min: -.,
                    max: .,
                                                description: 'Total Sales Amount'             }
                        };
    uniques = [
                    {   items: [
                                            'imid'
                                                            ],
                key: true,
                seq: true
            }
                        ];

}

const PRODUCT_SPEC = new ProductSpec();

export {PRODUCT_SPEC}