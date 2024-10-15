import { Button, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Select } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useGetAllPaymentTypesQuery } from '../../redux/api/PaymentTypeApi';
import { ICheckOut } from '../../helper/types/PaymentTypes';

const validationSchema = Yup.object({
    paymentTypeId: Yup.number().notOneOf([0], "Select Payment Type.").required('Select Payment Type.'),
    isPaid: Yup.number().notOneOf([0], "Select Payment status.").required('Select Payment status.'),
    statusId: Yup.number().notOneOf([0], "Select selling type.").required('Select selling type.'),
});


interface BillCheckOutProps {
    generateBill: (val: ICheckOut) => void
}

const BillCheckOut: React.FC<BillCheckOutProps> = ({ generateBill }) => {
    const { data } = useGetAllPaymentTypesQuery(null);

    const initialValues: ICheckOut = {
        paymentTypeId: 0,
        isPaid: 0,
        statusId: 1
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            generateBill(values)
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid2 spacing={5} container padding={1} border={2} borderRadius={2} bottom={0} position={"absolute"} width={"1135px"} >
                <Grid2 size={3}>
                    <FormControl fullWidth margin="normal" error={formik.touched.paymentTypeId && Boolean(formik.errors.paymentTypeId)}>
                        <InputLabel>Payment Type</InputLabel>
                        <Select
                            size='small'
                            label="Select"
                            name="paymentTypeId"
                            value={formik.values.paymentTypeId}
                            onChange={formik.handleChange}
                        >
                            {data?.data.map((method) => <MenuItem value={method.paymentTypeId}>{method.paymentType}</MenuItem>)}
                        </Select>
                        {formik.touched.paymentTypeId && Boolean(formik.errors.paymentTypeId) && (
                            <FormHelperText>{formik.errors.paymentTypeId}</FormHelperText>
                        )}
                    </FormControl>
                </Grid2>
                <Grid2 size={3}>
                    <FormControl fullWidth margin="normal" error={formik.touched.isPaid && Boolean(formik.errors.isPaid)}>
                        <InputLabel>Payment Done</InputLabel>
                        <Select
                            size='small'
                            label="Select"
                            name="isPaid"
                            value={formik.values.isPaid}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="0">Select</MenuItem>
                            <MenuItem value="1">YES</MenuItem>
                            <MenuItem value="2">NO</MenuItem>
                        </Select>
                        {formik.touched.isPaid && Boolean(formik.errors.isPaid) && (
                            <FormHelperText>{formik.errors.isPaid}</FormHelperText>
                        )}
                    </FormControl>
                </Grid2>

                <Grid2 size={3}>
                    <FormControl fullWidth margin="normal" error={formik.touched.statusId && Boolean(formik.errors.statusId)}>
                        <InputLabel>Select</InputLabel>
                        <Select
                            size='small'
                            label="Select"
                            disabled
                            name="statusId"
                            value={formik.values.statusId}
                            onChange={formik.handleChange}
                        >
                            <MenuItem value="1">Sold</MenuItem>
                            <MenuItem value="2">Returned</MenuItem>
                        </Select>
                        {formik.touched.statusId && Boolean(formik.errors.statusId) && (
                            <FormHelperText>{formik.errors.statusId}</FormHelperText>
                        )}
                    </FormControl>
                </Grid2>
                <Grid2 size={3}>
                    <FormControl margin="normal">
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Generate Bill
                        </Button>
                    </FormControl>
                </Grid2>
            </Grid2>
        </form>
    );
};

export default BillCheckOut;
