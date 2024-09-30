import EditIcon from '@mui/icons-material/Edit';
import RecentActorsSharpIcon from '@mui/icons-material/RecentActorsSharp';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../../../helper/types/Product';
import { useGetAllProductsQuery } from '../../../redux/api/ProductApi';
import FMSTableCard from '../../../utils/common/FMSTableCard';
import { manageDiscount } from '../../../helper/Functions';

const ProductTable = () => {
  const navigate = useNavigate();
  const { isSuccess, data } = useGetAllProductsQuery(null);

  const navigateUser = (path: string) => {
    navigate(path);
  }

  const columns: GridColDef[] = [
    { field: 'productName', headerName: 'Product Name', width: 150 },
    { field: 'brandName', headerName: 'Brand Name', width: 150 },
    { field: 'articleName', headerName: 'Article', width: 150 },
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
      field: 'categoryId', headerName: 'Selling Price', width: 150,
      renderCell: (data) => <>  {manageDiscount(data.row?.discount, data.row?.mrp)}</>
    },
    {
      field: 'shopId', headerName: 'Edit', width: 100, renderCell: (data) => <>
        {
          <>
            <IconButton title='Edit shop' color="success" onClick={() => navigateUser(`/update-shop/${data.row.shopId}`)} className='px-2' >
              <EditIcon />
            </IconButton>
          </>
        }

      </>
    },
    {
      field: "created", headerName: 'Users', width: 100, renderCell: (data) => <>
        {
          <>
            <IconButton title='Manage Users' color="warning" onClick={() =>
              navigate(`/user-list`,
                { state: { shopName: data.row.shopName, shopId: data.row.shopId } })} className='px-2' >
              <RecentActorsSharpIcon />
            </IconButton>
          </>
        }

      </>
    }

  ];

  useEffect(() => {
  }, []);

  return (
    <FMSTableCard title='Shop List' buttonLabel='Add Shop' buttonClick={() => navigate('/add-shop')}>
      {isSuccess ? <DataGrid
        autoHeight={false}
        autoPageSize={false}
        hideFooterPagination
        hideFooter
        disableColumnFilter={true}
        disableColumnMenu={true}
        rows={data?.data}
        rowSelection={false}
        columns={columns}
        getRowId={(data: IProduct) => data?.productId?.toString()}
      /> : "Loading....."}
    </FMSTableCard>

  );
};

export default ProductTable;
