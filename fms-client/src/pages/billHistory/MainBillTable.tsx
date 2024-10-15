import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IMainBillList } from '../../helper/types/Bill';
import { useGetAllMainBillsQuery } from '../../redux/api/MainBillApi';
import FMSTableCard from '../../utils/common/FMSTableCard';
import { useNavigate } from 'react-router-dom';

const MainBillTable = () => {
  const { data } = useGetAllMainBillsQuery(null,);
  const navigate = useNavigate();
  const handleSelectMainBill = (MainBill: IMainBillList) => {
    console.log(MainBill)
    navigate(`/bills-history`, { state: MainBill.mainBillId })
  };


  const columns: GridColDef[] = [
    { field: 'firstName', flex: 1, headerName: 'First Name', },
    { field: 'lastName', flex: 1, headerName: 'Last Name', },
    { field: 'mobileNo', flex: 1, headerName: 'Mobile No.', },
    { field: 'itemQuantity', flex: 1, headerName: 'Quantity', },
    { field: 'totalAmount', flex: 1, headerName: 'Total Amount', },
    { field: 'paidAmount', flex: 1, headerName: 'Paid Amount', },
    { field: 'isPaid', flex: 1, headerName: 'Payment Done', renderCell: (data) => data.row.isPaid ? "YES" : "NO" },
    {
      field: 'shopId', flex: 0.2, headerName: 'Edit', renderCell: (data) => <>
        {
          <>
            <IconButton color="success" onClick={
              () => handleSelectMainBill(data.row)} className='px-2' >
              <ManageHistoryIcon />
            </IconButton>
          </>
        }

      </>
    }
  ];

  return (
    <FMSTableCard title={`Main Bill List`}  >
      <DataGrid
        autoHeight={false}
        autoPageSize={false}
        disableColumnFilter={true}
        disableColumnMenu={true}
        rows={data?.data}
        rowSelection={false}
        columns={columns}
        getRowId={(data: IMainBillList) => data.mainBillId.toString()}
      />
    </FMSTableCard>
  );
};

export default MainBillTable;
