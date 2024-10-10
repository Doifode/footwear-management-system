import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IRegisterProduct } from '../../../helper/types/Product';
import { useGetAllProductsQuery } from '../../../redux/api/ProductApi';
import FMSTableCard from '../../../utils/common/FMSTableCard';
import FilterProduct from './FilterProduct';

const ProductTable = () => {
  const navigate = useNavigate();
  const { isSuccess, data } = useGetAllProductsQuery(null);
  const [productList, setProductList] = useState<IRegisterProduct[]>(data?.data || [])
  const [isLoading, setIsLoading] = useState(false)
  const columns: GridColDef[] = [
    { field: 'productName', headerName: 'Product Name', width: 150 },
    { field: 'brandName', headerName: 'Brand Name', width: 150 },
    { field: 'articleName', headerName: 'Article', width: 150 },
    { field: 'categoryName', headerName: 'Category', width: 150 },
    { field: 'colorName', headerName: 'Color Name', width: 150 },
    { field: 'size', headerName: 'Size', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    {
      field: 'actualPrice', headerName: 'Actual Price / MRP', width: 150,
      renderCell: (data) => <> {`${data.row.actualPrice} / ${data.row.mrp}`}</>
    },
    {
      field: 'discount', headerName: 'Discount', width: 150,
      renderCell: (data) => <> {`${data.row.discount} %`}</>
    },
    {
      field: 'sellingPrice', headerName: 'Selling Price', width: 150,
      renderCell: (data) => <>  {data.row.sellingPrice}</>
    },
    {
      field: 'shopId', headerName: 'Edit', width: 100, renderCell: (data) => <>
        {
          <>
            <IconButton title='Edit shop' color="success" onClick={() => navigate(`/update-product/ `, { state: data.row })} className='px-2' >
              <EditIcon />
            </IconButton>
          </>
        }
      </>
    }

  ];
  useEffect(() => { setProductList(data?.data || []) }, [data])

  return (
    <FMSTableCard title='Shop List' buttonLabel='Add Product' buttonClick={() => navigate('/add-product')}>
      <FilterProduct setIsLoading={setIsLoading} setProductList={setProductList}></FilterProduct>

      {(isSuccess || isLoading) ? <DataGrid
        hideFooterPagination
        hideFooter
        disableColumnFilter={true}
        disableColumnMenu={true}
        rows={productList}
        style={{ height: "350px", maxHeight: "450px", overflow: "hidden" }}
        columns={columns}
        onRowClick={(data) => navigate(`/update-product/ `, { state: data.row })}
        getRowId={(data: IRegisterProduct) => data?.productId?.toString()}
      /> :
        "Loading...."}
    </FMSTableCard>
  );
};

export default ProductTable;
