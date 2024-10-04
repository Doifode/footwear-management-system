export interface IRegisterProduct {
    productId: number;
    productName: string;
    articleId: number;
    categoryId: number;
    quantity: number;
    mrp: number;
    actualPrice: number;
    discount: number;
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
    sellingPrice: number
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
