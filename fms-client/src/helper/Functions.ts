export const manageDiscount = (discount: number, price: number) => {
    const discountPrice = (price * (discount / 100));
    return Number((price - discountPrice).toFixed(0));
}
export function calculateDiscount(totalValue: number, payableValue: number): number {
    if (totalValue <= 0 || payableValue < 0 || payableValue > totalValue) {
        throw new Error("Invalid values provided");
    }

    const discountAmount = totalValue - payableValue;
    const discountPercentage = (discountAmount / totalValue) * 100;

    return Number(discountPercentage.toFixed(2));
}