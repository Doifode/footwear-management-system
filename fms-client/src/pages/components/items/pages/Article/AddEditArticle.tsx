import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { IArticle } from '../../../../../helper/types/Article';
import { useAddArticleMutation } from '../../../../../redux/api/ArticleApi';
import { useGetAllBrandsQuery } from '../../../../../redux/api/BrandApi';

interface AddEditArticleProps {
    initialValues: IArticle,
    onClose: () => void
}

const AddEditArticle: React.FC<AddEditArticleProps> = ({ initialValues, onClose }) => {
    const [addArticle] = useAddArticleMutation();
    const { data } = useGetAllBrandsQuery(null,);

    const validationSchema = Yup.object({
        articleName: Yup.string()
            .required('Item name is required')
            .min(3, 'Item name should be at least 3 characters long'),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            submit(values)
        },
    });
    const submit = async (values: IArticle) => {
        const { data } = await addArticle(values);
        if (data?.success) {
            toast.success(data?.message);
            onClose()
        } else {
            toast.error(data?.message);
        }
    }
    return (
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
        >
            <TextField
                fullWidth
                id="articleName"
                name="articleName"
                label="Article Name"
                value={formik.values.articleName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.articleName && Boolean(formik.errors.articleName)}
                helperText={formik.touched.articleName && formik.errors.articleName}
            />
            <Autocomplete
                fullWidth
                className='mt-4'
                disablePortal
                value={{ brandId: formik.values.brandId, brandName: formik.values.brandName }}
                options={data?.data || []}
                getOptionLabel={(option) => option.brandName}
                onChange={(_, value) => {
                    if (value) {
                        formik.setFieldValue("brandId", value.brandId)
                        formik.setFieldValue("brandName", value.brandName)
                    }
                }}
                renderInput={(params) => <TextField name='brandId' {...params} label="Brands Name" />}
            />

            <Box display={"flex"} justifyContent={"end"} margin={2}>
                <Button color="primary" variant="contained" type="submit">
                    Add Article
                </Button>
            </Box>
        </Box>
    );
};

export default AddEditArticle;
