import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { IBrand } from '../../../../../helper/types/Brand';
import { useAddBrandMutation } from '../../../../../redux/api/BrandApi';

interface AddEditBrandProps {
    initialValues: IBrand,
    onClose: () => void
}

const AddEditBrand: React.FC<AddEditBrandProps> = ({ initialValues, onClose }) => {
    const [addBrand] = useAddBrandMutation()
    const validationSchema = Yup.object({
        brandName: Yup.string()
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
    const submit = async (values: IBrand) => {
        const { data } = await addBrand(values);
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
                id="brandName"
                name="brandName"
                label="Brand Name"
                value={formik.values.brandName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.brandName && Boolean(formik.errors.brandName)}
                helperText={formik.touched.brandName && formik.errors.brandName}
            />
            <Box display={"flex"} justifyContent={"end"} margin={2}>
                <Button color="primary" variant="contained" type="submit">
                    Add Brand
                </Button>
            </Box>
        </Box>
    );
};

export default AddEditBrand;
