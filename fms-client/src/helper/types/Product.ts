export interface IProduct {
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
}
