import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAddCategoryMutation } from '../../../../../redux/api/CategoryApi';
import { ICategory } from '../../../../../helper/types/Category';
import { toast } from 'react-toastify';

interface AddEditCategoryProps {
    initialValues: ICategory,
    onClose: () => void
}

const AddEditCategory: React.FC<AddEditCategoryProps> = ({ initialValues, onClose }) => {
    const [addCategory] = useAddCategoryMutation()
    const validationSchema = Yup.object({
        categoryName: Yup.string()
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
    const submit = async (values: ICategory) => {
        const { data } = await addCategory(values);
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
                id="categoryName"
                name="categoryName"
                label="Category Name"
                value={formik.values.categoryName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
                helperText={formik.touched.categoryName && formik.errors.categoryName}
            />
            <Box display={"flex"} justifyContent={"end"} margin={2}>
                <Button color="primary" variant="contained" type="submit">
                    Add Category
                </Button>
            </Box>
        </Box>
    );
};

export default AddEditCategory;
