import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { calculateDiscount } from '../../helper/Functions';
import { IRegisterProduct } from '../../helper/types/Product';
import FilterProduct from './FilterProduct';
import PaymentBar from './PaymentBar';

export default function ProductTable() {
    const [productListArray, setProductListArray] = useState<IRegisterProduct[]>([]);
    const [isCheckOut, setIsCheckOut] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFinalPrice = (index: number, value: number, keyVal: "quantity" | 'finalPrice' | "discount") => {
        setProductListArray((pre) => pre.map((item, i) => {
            if (i === index) {
                return { ...item, [keyVal]: value }
            } else {
                return item
            }
        }))
    };
    const handleRemoveProduct = (index: number) => {
        setProductListArray(productListArray.filter((_, i) => i != index));
    }

    return (<>
        <FilterProduct setLoading={setLoading} setBillingArray={setProductListArray} />

        <Button variant='contained' color="success" className='my-1' onClick={() => setIsCheckOut(true)} hidden={isCheckOut}> Checkout</Button>
        <Button variant='contained' color="error" className='my-1' onClick={() => setIsCheckOut(false)} hidden={!isCheckOut}> Change </Button>
        <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell >Article</TableCell>
                        <TableCell >Color</TableCell>
                        <TableCell >Size</TableCell>
                        <TableCell >MRP</TableCell>
                        <TableCell >Disc %</TableCell>
                        <TableCell >Selling Price</TableCell>
                        <TableCell >Quantity</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Final Price</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                {loading ? "Loading ..." :
                    <TableBody>
                        {productListArray.map((product, productIndex) => (
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
                                <TableCell >{product.discount} %</TableCell>
                                <TableCell >{product.sellingPrice}</TableCell>
                                <TableCell style={{ width: "auto" }} >
                                    {product.quantity}
                                </TableCell>
                                <TableCell style={{ width: "auto" }} >
                                    {product.quantity * product.sellingPrice}
                                </TableCell>
                                <TableCell style={{ width: "auto" }} >
                                    <input disabled={isCheckOut} onChange={(e) => {
                                        if (Number(e.target.value) > (product.quantity * product.sellingPrice)) {
                                            toast.warn("Final price can't be greater than 'Total Price'");
                                            return;
                                        }
                                        handleFinalPrice(productIndex, Number(e.target.value), 'finalPrice')
                                        handleFinalPrice(productIndex,
                                            (calculateDiscount((product.quantity * product.sellingPrice), Number(e.target.value))),
                                            'discount')
                                    }}
                                        type="text"
                                        value={product.finalPrice} />
                                </TableCell>
                                <TableCell>
                                    <DeleteForeverIcon onClick={() => handleRemoveProduct(productIndex)} color='error' />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>}
            </Table>
        </TableContainer>
        {productListArray.length ? <PaymentBar productListArray={productListArray} /> : ""}
    </>
    );
}
