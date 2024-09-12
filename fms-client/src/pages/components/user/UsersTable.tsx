import EditIcon from '@mui/icons-material/Edit';
import RecentActorsSharpIcon from '@mui/icons-material/RecentActorsSharp';
import { IconButton, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiResponse } from '../../../helper/types/CommonTypes';
import { IRegisterShop } from '../../../helper/types/Shop';
import apiClient from '../../../httpConfig/apiInClient';
import FMSTableCard from '../../common/FMSTableCard';
const UserTable = () => {
    const [users, setUsers] = useState<IRegisterShop[]>([]);
    const navigate = useNavigate();
    const { state } = useLocation();

    const getAllUsers = async () => {
        try {
            const getAllUsersResponse = await apiClient.get<apiResponse<IRegisterShop[]>>("/user/" + state.shopId);
            if (getAllUsersResponse.data.success) {
                if (getAllUsersResponse.data.data?.length) {
                    setUsers(getAllUsersResponse.data.data);
                }
            }
        } catch (error) {
            console.error("Failed to fetch users data", error);
        }
    };

    const navigateUser = (path: string) => {
        navigate(path);
    };

    const columns: GridColDef[] = [
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'userName', headerName: 'User Name', width: 150 },
        { field: 'mobileNo', headerName: 'Mobile No.', width: 150 },
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
                        <IconButton color="success" onClick={() => navigateUser(`/update-shop/${data.row.shopId}`)} className='px-2' >
                            <EditIcon />
                        </IconButton>
                        <IconButton color="warning" onClick={() => navigateUser(`/add-user/${data.row.shopId}`)} className='px-2' >
                            <RecentActorsSharpIcon />
                        </IconButton>
                    </>
                }

            </>
        }

    ];

    useEffect(() => {
        getAllUsers();
    }, []);

    return (

        <FMSTableCard title={`${state?.shopName}  Users`} buttonClick={() => navigate("/add-user", { state: state })} buttonLabel='Add User' >
            <DataGrid
                autoHeight={false}
                autoPageSize={false}
                disableColumnFilter={true}
                disableColumnMenu={true}
                rows={users}
                rowSelection={false}
                columns={columns}
                getRowId={(data: IRegisterShop) => data.userId.toString()}
            />
        </FMSTableCard>
    );
};

export default UserTable;
