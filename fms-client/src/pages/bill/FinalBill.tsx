import { Grid2 } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../helper/types/CommonTypes";
import { IRegisterCustomer } from '../../helper/types/Customer';
import { IBill, ICheckOut, IMainBill } from '../../helper/types/PaymentTypes';
import { useAddBillMutation } from '../../redux/api/GenerateBillAPi';
import { useAddMainBillMutation } from '../../redux/api/MainBillApi';
import FMSDialogBox from '../../utils/common/FMSDialogBox';
import AddEditCustomer from './AddEditCustomer';
import BillCheckOut from './CheckOutList';
import { IRegisterProduct } from '../../helper/types/Product';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { clearActiveProduct } from '../../redux/slice/Bill';

const FinalBill = () => {
    const { totalValues, activeBillProduct } = useSelector((state: IRootState) => state.Bill);
    const [customerDialogOpen, setCustomerDialogOpen] = useState(true);
    const [customerDetails, setCustomerDetails] = useState<IRegisterCustomer>({ customerId: 0, firstName: "", lastName: "", mobileNo: 0, shopId: 0 });
    const [addBill] = useAddBillMutation();
    const [addMainBill] = useAddMainBillMutation()
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const generateBill = async (values: ICheckOut) => {
        const mainBillPayload: IMainBill = {
            customerId: customerDetails.customerId,
            isPaid: Number(values.isPaid),
            itemQuantity: totalValues.itemsValue,
            grandTotal: totalValues.total,
            paidAmount: totalValues.payableAmount,
            totalAmount: totalValues.total,
            mainBillId: 0
        }
        const { data } = await addMainBill(mainBillPayload);
        if (data?.success) {
            activeBillProduct.forEach(async (item: IRegisterProduct) => {
                try {
                    const {
                        productId,
                        productName,
                        mrp,
                        actualPrice,
                        discount,
                        offeredDiscount,
                        size,
                        brandName,
                        categoryName,
                        articleName,
                        colorName,
                        sellingPrice,
                        finalPrice,
                    } = item;
                    const billPayload: IBill = {
                        productId,
                        productName,
                        mrp,
                        actualPrice,
                        discount,
                        offeredDiscount,
                        size,
                        brandName: brandName || "",
                        categoryName: categoryName || "",
                        articleName: articleName || "",
                        colorName: colorName || "",
                        sellingPrice: sellingPrice || 0,
                        finalPrice: finalPrice || 0,
                        paymentId: values.paymentTypeId,
                        statusId: values.statusId,
                        mainBillId: data?.data.mainBillId,
                        isPaid: 1,
                        paidAmount: totalValues.payableAmount,
                        remainingAmount: 0
                    }
                    const { data: BillData } = await addBill(billPayload);
                    if (BillData?.success) {
                        toast.success("Bill generated successfully.");
                        dispatch(clearActiveProduct());
                        navigate("/bill");
                    }
                }
                catch (error) {

                }

            })
        }
    }

    return (
        <>
            {CustomerDetails(customerDetails)}

            {BillDetails(totalValues)}

            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    {TableHeader()}
                    <TableBody>
                        {activeBillProduct.map((product) => (
                            <TableRow
                                key={product.productId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {product.productName}
                                </TableCell>
                                <TableCell >{product.articleName}</TableCell>
                                <TableCell >{product.colorName}</TableCell>
                                <TableCell >{product.size}</TableCell>
                                <TableCell >{product.mrp}</TableCell>
                                <TableCell >{product.offeredDiscount} %</TableCell>
                                <TableCell >{product.sellingPrice}</TableCell>
                                <TableCell style={{ width: "auto" }} >
                                    {product.quantity}
                                </TableCell>
                                <TableCell style={{ width: "auto" }} >
                                    {product.quantity * product.sellingPrice}
                                </TableCell>
                                <TableCell style={{ width: "auto" }} >
                                    {product.finalPrice}
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <BillCheckOut generateBill={generateBill}></BillCheckOut>
            <FMSDialogBox open={customerDialogOpen} onClose={() => setCustomerDialogOpen(false)} title='Customer' >
                <AddEditCustomer setCustomerDetails={setCustomerDetails} setCustomerDialogOpen={setCustomerDialogOpen}></AddEditCustomer>
            </FMSDialogBox>
        </>
    )
}

export default FinalBill

function TableHeader() {
    return <TableHead>
        <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell>Article</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>MRP</TableCell>
            <TableCell>Disc %</TableCell>
            <TableCell>Selling Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Final Price</TableCell>
        </TableRow>
    </TableHead>;
}

function BillDetails(totalValues: { itemsValue: number, payableAmount: number; total: number; discount: number; }) {
    return <Grid2 container spacing={5} border={2} borderRadius={2} paddingX={3} marginY={2}>
        <Grid2 size={3}>
            <label htmlFor="">Quantity</label>
            <h5>{totalValues.itemsValue}</h5>
        </Grid2>
        <Grid2 size={3}>
            <label htmlFor="">Total Amount</label>
            <h5>{totalValues.total}</h5>
        </Grid2>
        <Grid2 size={3}>
            <label htmlFor="">Discount</label>
            <h5>{totalValues.discount}</h5>
        </Grid2>
        <Grid2 size={3}>
            <label htmlFor="">Payable Amount</label>
            <h5>{totalValues.payableAmount}</h5>
        </Grid2>
    </Grid2>;
}

function CustomerDetails(customerDetails: IRegisterCustomer) {
    return <Grid2 container spacing={5} paddingX={3} marginY={2}>
        <Grid2 size={4}>
            <h5>{customerDetails.firstName}</h5>
        </Grid2>
        <Grid2 size={4}>
            <h5>{customerDetails.lastName}</h5>
        </Grid2>
        <Grid2 size={4}>
            <h5>{customerDetails.mobileNo}</h5>
        </Grid2>
    </Grid2>;
}
