import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useLocation, useNavigate } from 'react-router-dom';
import { IRegisterUser } from '../../../helper/types/User';
import { useGetAllUsersByShopIdQuery } from '../../../redux/api/UserApi';
import FMSTableCard from '../../../utils/common/FMSTableCard';
const UserTable = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { data } = useGetAllUsersByShopIdQuery(state.shopId, {
        refetchOnMountOrArgChange: true,
    })

    const navigateUser = (path: string) => {
        navigate(path);
    };

    const columns: GridColDef[] = [
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'userName', headerName: 'User Name', width: 150 },
        { field: 'mobileNo', headerName: 'Mobile No.', width: 150 },
        { field: 'roleName', headerName: 'Role', width: 150 },
        {
            field: 'isActive', headerName: 'Active', width: 125, renderCell: (data) => <>
                {
                    (data.row.isActive && !data.row.isDeleted) ?
                        <Typography padding={2} color="success">
                            Active
                        </Typography>
                        :
                        <Typography padding={2} color="error">
                            Disable
                        </Typography>
                }
            </>
        },
        {
            field: 'shopId', headerName: 'Edit', width: 125, renderCell: (data) => <>
                {
                    <>
                        <IconButton color="success" onClick={() => navigateUser(`/add-user/${data.row.shopId}`)} className='px-2' >
                            <EditIcon />
                        </IconButton>
                    </>
                }

            </>
        }

    ];

    return (

        <FMSTableCard title={`${state?.shopName}  Users`} buttonClick={() => navigate("/add-user", { state: state })} buttonLabel='Add User' >
            <DataGrid
                autoHeight={false}
                autoPageSize={false}
                disableColumnFilter={true}
                disableColumnMenu={true}
                rows={data?.data}
                rowSelection={false}
                columns={columns}
                getRowId={(data: IRegisterUser) => data.userId.toString()}
            />
        </FMSTableCard>
    );
};

export default UserTable;
