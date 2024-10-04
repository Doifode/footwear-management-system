import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { IColor } from '../../../../../helper/types/Color';
import { useGetAllColorsQuery } from '../../../../../redux/api/ColorApi';
import FMSDialogBox from '../../../../../utils/common/FMSDialogBox';
import FMSTableCard from '../../../../../utils/common/FMSTableCard';
import AddEditColor from './AddEditColor';

const ColorsTable = () => {
    const [handleOpenDialog, setHandleOpenDialog] = useState(false);
    const [selectedColor, setSelectedColor] = useState<IColor>({ colorId: 0, colorName: "", colorCode: "" })
    const { data } = useGetAllColorsQuery(null, {});

    const handleSelectColor = (Color: IColor) => {
        setSelectedColor(Color);
        setHandleOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setSelectedColor({ colorId: 0, colorName: "", colorCode: "" });
        setHandleOpenDialog(false);
    }

    const columns: GridColDef[] = [
        { field: 'colorName', flex: 1, headerName: 'Color Name', },
        {
            field: 'colorCode', flex: 1, headerName: 'Color Code', renderCell: (data) => {
                return <Box padding={5} bgcolor={data.row.colorCode} color={"black"}> {data.row.colorCode}</Box>
            }
        },
        {
            field: 'shopId', flex: 0.2, headerName: 'Edit', renderCell: (data) => <>
                {
                    <>
                        <IconButton color="success" onClick={
                            () => handleSelectColor(data.row)} className='px-2' >
                            <EditIcon />
                        </IconButton>
                    </>
                }

            </>
        }
    ];
    console.log({ data }, "colorData")
    return (

        <FMSTableCard title={`Color List`} buttonClick={() => setHandleOpenDialog(true)} buttonLabel='Add Color' >
            <DataGrid
                autoHeight={false}
                autoPageSize={false}
                disableColumnFilter={true}
                disableColumnMenu={true}
                rows={data?.data}
                rowSelection={false}
                columns={columns}
                getRowId={(data: IColor) => data.colorId.toString()}
            />
            <FMSDialogBox open={handleOpenDialog} title="Add Color" onClose={handleCloseDialog}>
                <AddEditColor initialValues={selectedColor} onClose={handleCloseDialog} />
            </FMSDialogBox>
        </FMSTableCard>
    );
};

export default ColorsTable;
