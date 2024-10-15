import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useLocation } from 'react-router-dom';
import { useGetAllBillsByMainBillQuery } from '../../redux/api/GenerateBillAPi';
import FMSTableCard from '../../utils/common/FMSTableCard';

const BillTable = () => {
    const { state } = useLocation()
    const { data, isLoading } = useGetAllBillsByMainBillQuery(state);

    return (
        <FMSTableCard title={`Main Bill List`}  >
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell >Category</TableCell>
                            <TableCell >Article</TableCell>
                            <TableCell >Color</TableCell>
                            <TableCell >Size</TableCell>
                            <TableCell >MRP</TableCell>
                            <TableCell >Disc %</TableCell>
                            <TableCell >Offered Disc %</TableCell>
                            <TableCell >Selling Price</TableCell>
                            <TableCell>Final Price</TableCell>
                        </TableRow>
                    </TableHead>
                    {isLoading ? "Loading ..." :
                        <TableBody>
                            {data?.data.map((product) => (
                                <TableRow
                                    key={product.productId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {product.productName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {product.categoryName}
                                    </TableCell>
                                    <TableCell >{product.articleName}</TableCell>
                                    <TableCell >{product.colorName}</TableCell>
                                    <TableCell >{product.size}</TableCell>
                                    <TableCell >{product.mrp}</TableCell>
                                    <TableCell >{product.discount} %</TableCell>
                                    <TableCell >{product.offeredDiscount} %</TableCell>
                                    <TableCell >{product.sellingPrice}</TableCell>
                                    <TableCell style={{ width: "auto" }} >
                                        {product.finalPrice}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>}
                </Table>
            </TableContainer>
        </FMSTableCard>
    );
};

export default BillTable;
