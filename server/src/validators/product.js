import { z } from 'zod';

export const registerProductValidator = z.object({
    productId: z.number(),
    productName: z.string(),
    articleId: z.number(),
    categoryId: z.number(),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    mrp: z.number(),
    actualPrice: z.number(),
    discount: z.number().min(0).max(100, "Discount must be between 0 and 100"),
    size: z.number().min(1, "Size must be at least 1"),
    shopId: z.number(),
    colorId: z.number(),
    sellingPrice: z.number(),
});

export const getSizeProductValidator = z.object({
    productName: z.string("productName required."),
    articleId: z.number("Article Id required."),
    categoryId: z.number("category Id required."),
    shopId: z.number("Shop Id required."),
    colorId: z.number("Color Id required."),
});
export const getSizeProductBillingValidator = z.object({
    articleId: z.number("Article Id required."),
    colorId: z.number("Color Id required."),
    size: z.number("Size Id required."),
});
export const deleteProductValidator = z.object({
    productId: z.number("productName required."),

});


