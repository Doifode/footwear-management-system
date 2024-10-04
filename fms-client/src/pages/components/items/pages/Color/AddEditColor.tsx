import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { IColor } from '../../../../../helper/types/Color';
import { useAddColorMutation } from '../../../../../redux/api/ColorApi';

interface AddEditColorProps {
    initialValues: IColor,
    onClose: () => void
}

const AddEditColor: React.FC<AddEditColorProps> = ({ initialValues, onClose }) => {
    const [addColor] = useAddColorMutation()
    const validationSchema = Yup.object({
        colorName: Yup.string()
            .required('Color name is required')
            .min(3, 'Item name should be at least 3 characters long'),
        colorCode: Yup.string()
            .required('Color name is required')
            .min(3, 'Item name should be at least 3 characters long'),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values,"values")
            submit(values)
        },
    });
    const submit = async (values: IColor) => {
        const { data } = await addColor(values);
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
                id="ColorName"
                name="colorName"
                label="Color Name"
                value={formik.values.colorName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                error={formik.touched.colorName && Boolean(formik.errors.colorName)}
                helperText={formik.touched.colorName && formik.errors.colorName}
            />
            <TextField
                fullWidth
                type="color"
                id="colorCode"
                name="colorCode"
                label="Color Code"
                value={formik.values.colorCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.colorCode && Boolean(formik.errors.colorCode)}
                helperText={formik.touched.colorCode && formik.errors.colorCode}
            />
            <Box display={"flex"} justifyContent={"end"} margin={2}>
                <Button color="primary" variant="contained" type="submit">
                    Add Color
                </Button>
            </Box>
        </Box>
    );
};

export default AddEditColor;
