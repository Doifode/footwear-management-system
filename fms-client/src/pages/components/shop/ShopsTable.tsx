import EditIcon from '@mui/icons-material/Edit';
import RecentActorsSharpIcon from '@mui/icons-material/RecentActorsSharp';
import StoreSharpIcon from '@mui/icons-material/StoreSharp';
import { Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IRegisterShop } from '../../../helper/types/Shop';
import { activateShopByIdRoute, disableShopByIdRoute } from '../../../httpConfig/ApiRoutes';
import { useActivateShopMutation, useDisableShopMutation, useGetAllShopsQuery } from '../../../redux/api/ShopApi';
import FMSTableCard from '../../../utils/common/FMSTableCard';

const ShopsTable = () => {
    const navigate = useNavigate();
    const { isSuccess, data } = useGetAllShopsQuery("");
    const [disableShop] = useDisableShopMutation()
    const [activateShop] = useActivateShopMutation()

    const shopActions = async (route: string, shopId: number) => {
        try {
            if (route === disableShopByIdRoute) {
                const { data } = await disableShop(shopId);
                if (data?.success) {
                    toast.success(data.message)
                }
            } else {
                const { data } = await activateShop(shopId);
                if (data?.success) {
                    toast.success(data?.message)
                }
            };

        } catch (error) {
            console.log(error);
        }
    };
    const navigateUser = (path: string) => {
        navigate(path);
    }

    const columns: GridColDef[] = [
        { field: 'shopName', headerName: 'Shop Name', width: 150 },
        { field: 'shopUserName', headerName: 'Shop User Name', width: 150 },
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
                getRowId={(data: IRegisterShop) => data?.shopId?.toString() || (Math.random() * 1000)}
            /> : "Loading....."}
        </FMSTableCard>

    );
};

export default ShopsTable;
