import EditIcon from '@mui/icons-material/Edit';
import RecentActorsSharpIcon from '@mui/icons-material/RecentActorsSharp';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiResponse } from '../../../helper/types/CommonTypes';
import { IRegisterShop } from '../../../helper/types/Shop';
import apiClient from '../../../httpConfig/apiInClient';
import { activateShopByIdRoute, disableShopByIdRoute } from '../../../httpConfig/ApiRoutes';
import FMSTableCard from '../../common/FMSTableCard';
const ShopsTable = () => {
    const [shops, setShops] = useState<IRegisterShop[]>([]);
    const navigate = useNavigate();
    const getAllShops = async () => {
        try {
            const getAllShopsResponse = await apiClient.get<apiResponse<IRegisterShop[]>>("/shop");
            if (getAllShopsResponse.data.success) {
                if (getAllShopsResponse.data.data?.length) {
                    setShops(getAllShopsResponse.data.data);
                }
            }
        } catch (error) {
            console.error("Failed to fetch shops data", error);
        }
    };

    const shopActions = async (route: string, shopId: number) => {
        try {
            const shopActionResponse = await apiClient.delete<apiResponse<[]>>(`${route}${shopId}`);
            if (shopActionResponse.data.success) {
                toast.success(shopActionResponse.data.message);
                getAllShops();
            } else {
                toast.error(shopActionResponse.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const navigateUser = (path: string) => {
        navigate(path);
    }

    const columns: GridColDef[] = [
        { field: 'shopName', headerName: 'Shop Name', width: 150 },
        { field: 'userName', headerName: 'User Name', width: 150 },
        { field: 'state', headerName: 'State', width: 150 },
        { field: 'district', headerName: 'District', width: 150 },
        { field: 'tahsil', headerName: 'Tahsil', width: 150 },
        {
            field: 'isActive', headerName: 'Active', width: 125, renderCell: (data) => <>
                {
                    (data.row.isActive && !data.row.isDeleted) ?
                        <Button onClick={() => shopActions(disableShopByIdRoute, data.row.shopId)} className='px-2' color='warning' variant='contained'>
                            Disable
                            <StoreSharpIcon />
                        </Button> :
                        <Button onClick={() => shopActions(activateShopByIdRoute, data.row.shopId)} className='px-2' variant='contained' color='success'>
                            Activate <StoreSharpIcon />
                        </Button>
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
                        <IconButton color="warning" onClick={() =>
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
        getAllShops();
    }, []);

    return (
        <FMSTableCard title='Shop List' buttonLabel='Add Shop' buttonClick={() => navigate('/add-shop')}>
            <DataGrid
                autoHeight={false}
                autoPageSize={false}
                disableColumnFilter={true}
                disableColumnMenu={true}
                rows={shops}
                rowSelection={false}
                columns={columns}
                getRowId={(data: IRegisterShop) => data?.shopId?.toString() || (Math.random() * 1000)}
            />
        </FMSTableCard>

    );
};

export default ShopsTable;
