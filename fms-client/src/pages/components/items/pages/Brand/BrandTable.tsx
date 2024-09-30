import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { IBrand } from '../../../../../helper/types/Brand';
import { useGetAllBrandsQuery } from '../../../../../redux/api/BrandApi';
import FMSDialogBox from '../../../../../utils/common/FMSDialogBox';
import FMSTableCard from '../../../../../utils/common/FMSTableCard';
import AddEditBrand from './AddEditBrand';

const BrandsTable = () => {
    const [handleOpenDialog, setHandleOpenDialog] = useState(false);
    const [selectedCategory, setSelectedBrand] = useState<IBrand>({ brandId: 0, brandName: "" })
    const { data } = useGetAllBrandsQuery(null,);
    const handleSelectCategory = (category: IBrand) => {
        setSelectedBrand(category);
        setHandleOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setSelectedBrand({ brandId: 0, brandName: "" });
        setHandleOpenDialog(false);
    }

    const columns: GridColDef[] = [
        { field: 'brandName', flex: 1, headerName: 'Brand Name', },
        {
            field: 'shopId', flex: 0.2, headerName: 'Edit', renderCell: (data) => <>
                {
                    <>
                        <IconButton color="success" onClick={
                            () => handleSelectCategory(data.row)} className='px-2' >
                            <EditIcon />
                        </IconButton>
                    </>
                }

            </>
        }
    ];

    return (

        <FMSTableCard title={`Category List`} buttonClick={() => setHandleOpenDialog(true)} buttonLabel='Add Category' >
            <DataGrid
                autoHeight={false}
                autoPageSize={false}
                disableColumnFilter={true}
                disableColumnMenu={true}
                rows={data?.data}
                rowSelection={false}
                columns={columns}
                getRowId={(data: IBrand) => data.brandId.toString()}
            />
            <FMSDialogBox open={handleOpenDialog} title="Add Category" key={1} onClose={handleCloseDialog}>
                <AddEditBrand initialValues={selectedCategory} onClose={handleCloseDialog} />
            </FMSDialogBox>
        </FMSTableCard>
    );
};

export default BrandsTable;
