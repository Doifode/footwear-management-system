import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { ICategory } from '../../../../../helper/types/Category';
import { useGetAllCategoriesQuery } from '../../../../../redux/api/CategoryApi';
import FMSDialogBox from '../../../../../utils/common/FMSDialogBox';
import FMSTableCard from '../../../../../utils/common/FMSTableCard';
import AddEditCategory from './AddEditCategory';

const CategoryTable = () => {
    const [handleOpenDialog, setHandleOpenDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ICategory>({ categoryId: 0, categoryName: "" })
    const { data } = useGetAllCategoriesQuery(null);
    const handleSelectCategory = (category: ICategory) => {
        setSelectedCategory(category);
        setHandleOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setSelectedCategory({ categoryId: 0, categoryName: "" });
        setHandleOpenDialog(false);
    }

    const columns: GridColDef[] = [
        { field: 'categoryName', flex: 1, headerName: 'Category Name', },
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
                getRowId={(data: ICategory) => data.categoryId.toString()}
            />
            <FMSDialogBox open={handleOpenDialog} title="Add Category"   onClose={handleCloseDialog}>
                <AddEditCategory initialValues={selectedCategory} onClose={handleCloseDialog} />
            </FMSDialogBox>
        </FMSTableCard>
    );
};

export default CategoryTable;
