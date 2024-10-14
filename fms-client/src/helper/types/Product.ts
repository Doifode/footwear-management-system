export interface IRegisterProduct {
    productId: number;
    productName: string;
    articleId: number;
    categoryId: number;
    quantity: number;
    mrp: number;
    actualPrice: number;
    discount: number;
    offeredDiscount: number;
    size: number;
    shopId: number;
    createdBy?: number;
    updatedBy?: number;
    createdAt?: string;
    updatedAt?: string;
    colorId: number;
    brandName?: string;
    categoryName?: string;
    articleName?: string;
    colorName?: string;
    sellingPrice: number,
    finalPrice?: number
};


export interface ISizeType {
    size: number,
    quantity: number,
    isAdded: boolean,
    productId: number,
    isEditing: boolean
}

export interface IGetSizes {
    "productName": string,
    "articleId": number,
    "categoryId": number,
    "shopId": number,
    "colorId": number
}
export interface IGetProductBilling {
    "articleId": number,
    "colorId": number,
    size: string,
    colorName: string,
    articleName: string,
    colorCode: string
}
export interface IGetProduct {
    "articleId": number,
    "colorId": number,
    size: number
}
