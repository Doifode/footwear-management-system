export const manageDiscount = (discount: number, price: number) => {
    const discountPrice = (price * (discount / 100));
    return (price - discountPrice).toFixed(2);
}