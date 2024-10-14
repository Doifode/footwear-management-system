export interface IPaymentTypes {
    "paymentTypeId": number,
    "paymentType": string,
    "isActive": string
}

export interface IBill {
    productId: number,
    size: number,
    sellingPrice: number,
    mrp: number,
    discount: number,
    offeredDiscount: number,
    finalPrice: number,
    isPaid: number,
    paidAmount: number,
    actualPrice: number,
    remainingAmount: number,
    categoryName: string,
    articleName: string,
    brandName: string,
    colorName: string,
    productName: string,
    paymentId: number,
    statusId: number,
    mainBillId: number
}

export interface IMainBill {
    "itemQuantity": number,
    "totalAmount": number,
    "paidAmount": number,
    "grandTotal": number,
    "isPaid": number,
    "customerId": number,
    mainBillId: number
}
export interface ICheckOut {
    paymentTypeId: number;
    isPaid: number,
    statusId: number
}