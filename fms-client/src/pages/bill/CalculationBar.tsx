import { Button, Grid2 } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IRegisterProduct } from '../../helper/types/Product'
import { calculateDiscount } from '../../helper/Functions'
import { useDispatch } from 'react-redux'
import { setActiveBillProduct } from '../../redux/slice/Bill'
import { useNavigate } from 'react-router-dom'

interface CalculationBarProps {
    productListArray: IRegisterProduct[]
}

const CalculationBar: React.FC<CalculationBarProps> = ({ productListArray }) => {
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [payableAmount, setPayableAmount] = useState(0);
    const [items, setItems] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePaymentNavigate = () => {
        const data = { total, discount, payableAmount, itemsValue: items }
        dispatch(setActiveBillProduct({ productList: productListArray, totalValues: data }));
        navigate("/payment")
    };

    const handleCheckoutValues = (): { totalValue: number, itemsValue: number, payableValue: number, discount: number } => {
        let totalValue = 0;
        let itemsValue = 0;
        let payableValue = 0;
        productListArray.forEach((item) => {
            totalValue += item.sellingPrice;
        });
        productListArray.forEach((item) => {
            itemsValue += item.quantity;
        });
        productListArray.forEach((item) => {
            payableValue += item?.finalPrice || 0;
        });
        const discount = calculateDiscount(totalValue, payableValue)
        return {
            itemsValue,
            payableValue,
            totalValue,
            discount
        }
    }

    const handleCheckout = () => {
        setTotal(handleCheckoutValues().totalValue)
        setPayableAmount(handleCheckoutValues().payableValue)
        setItems(handleCheckoutValues().itemsValue);
        setDiscount(handleCheckoutValues().discount);
    }

    useEffect(() => { handleCheckout() }, [productListArray])

    return (
        <Grid2 padding={2} border={2} borderRadius={2} bottom={0} position={"absolute"} width={"1135px"} container>
            <Grid2 size={2}>Total :{total}</Grid2>
            <Grid2 size={2}>Items : {items}</Grid2>
            <Grid2 size={2}>Discount : {discount} %</Grid2>
            <Grid2 size={2}>Payable Amount :{payableAmount}</Grid2>
            <Grid2 size={2}><Button onClick={handlePaymentNavigate}> Proceed to payment</Button></Grid2>
        </Grid2>
    )
}

export default React.memo(CalculationBar)