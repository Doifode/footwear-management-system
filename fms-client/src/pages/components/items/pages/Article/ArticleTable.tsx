import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import FMSDialogBox from '../../../../../utils/common/FMSDialogBox';
import FMSTableCard from '../../../../../utils/common/FMSTableCard';
import AddEditArticle from './AddEditArticle';
import { IArticle } from '../../../../../helper/types/Article';
import { useGetAllArticlesQuery } from '../../../../../redux/api/ArticleApi';

const ArticleTable = () => {
  const [handleOpenDialog, setHandleOpenDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<IArticle>({ articleId: 0, articleName: "", brandId: 0, brandName: "" })
  const { data } = useGetAllArticlesQuery(null,);
  const handleSelectArticle = (Article: IArticle) => {
    setSelectedArticle(Article);
    setHandleOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setSelectedArticle({ articleId: 0, articleName: "", brandId: 0, brandName: "" });
    setHandleOpenDialog(false);
  }

  const columns: GridColDef[] = [
    { field: 'brandName', flex: 1, headerName: 'Brand Name', },
    { field: 'articleName', flex: 1, headerName: 'Article Name', },
    {
      field: 'shopId', flex: 0.2, headerName: 'Edit', renderCell: (data) => <>
        {
          <>
            <IconButton color="success" onClick={
              () => handleSelectArticle(data.row)} className='px-2' >
              <EditIcon />
            </IconButton>
          </>
        }

      </>
    }
  ];

  return (

    <FMSTableCard title={`Article List`} buttonClick={() => setHandleOpenDialog(true)} buttonLabel='Add Article' >
      <DataGrid
        autoHeight={false}
        autoPageSize={false}
        disableColumnFilter={true}
        disableColumnMenu={true}
        rows={data?.data}
        rowSelection={false}
        columns={columns}
        getRowId={(data: IArticle) => data.articleId.toString()}
      />
      <FMSDialogBox open={handleOpenDialog} title="Add Article" onClose={handleCloseDialog}>
        <AddEditArticle initialValues={selectedArticle} onClose={handleCloseDialog} />
      </FMSDialogBox>
    </FMSTableCard>
  );
};

export default ArticleTable;
