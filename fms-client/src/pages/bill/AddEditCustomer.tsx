import { Autocomplete, Box, Button, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { IRegisterCustomer } from '../../helper/types/Customer';
import { useAddCustomerMutation, useGetAllCustomersQuery } from '../../redux/api/CustomerApi';

// Validation schema using Yup
const validationSchema = Yup.object({
    firstName: Yup.string()
        .required('First Name is required')
        .min(2, 'First Name should be at least 2 characters'),
    lastName: Yup.string()
        .required('Last Name is required')
        .min(2, 'Last Name should be at least 2 characters'),
    mobileNo: Yup.string()
        .matches(/^(\d{10})$/, 'Mobile number must be exactly 10 digits')
        .required('Mobile Number is required'),
});

interface AddEditCustomerProps {
    setCustomerDialogOpen: any,
    setCustomerDetails: any,
}

const AddEditCustomer: React.FC<AddEditCustomerProps> = ({ setCustomerDialogOpen, setCustomerDetails }) => {
    const [addCustomer] = useAddCustomerMutation();
    const { data } = useGetAllCustomersQuery(null);
    const [isNew, setIsNew] = useState(false);

    const initialValues: IRegisterCustomer = {
        firstName: '',
        lastName: '',
        mobileNo: 0,
        customerId: 0
    };

    const handleSubmit = async (values: IRegisterCustomer) => {
        try {
            const { data } = await addCustomer(values);
            if (data?.success) {
                toast.success(data.message);
                setCustomerDialogOpen(false);
                setCustomerDetails(data?.data)
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            toast.error("An error occurred while adding customer");
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values: IRegisterCustomer) => {
            if (!isNew) {
                handleSubmit(values);
            } else {
                setCustomerDetails(values);
                setCustomerDialogOpen(false)
            }
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <Box display="flex" flexDirection="column" maxWidth={450} margin="0 auto" p={2}>
                <Autocomplete
                    fullWidth
                    hidden={!isNew}
                    size="small"
                    options={data?.data || []}
                    getOptionLabel={(option) => option.mobileNo.toString()}
                    onChange={(_, value) => {
                        formik.setFieldValue("firstName", value?.firstName)
                        formik.setFieldValue("lastName", value?.lastName)
                        formik.setFieldValue("mobileNo", value?.mobileNo)
                        formik.setFieldValue("customerId", value?.customerId)
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search Mobile no."
                        />
                    )}
                />
                <TextField
                    disabled={isNew}
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    size="small"
                    margin="normal"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                />

                <TextField
                    disabled={isNew}
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    size="small"
                    fullWidth
                    margin="normal"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                />

                <TextField
                    hidden={isNew}
                    name="mobileNo"
                    label="Mobile Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={formik.values.mobileNo}
                    onChange={formik.handleChange}
                    error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
                    helperText={formik.touched.mobileNo && formik.errors.mobileNo}
                />

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button onClick={() => setIsNew(!isNew)} type="button" variant="contained" color="primary" fullWidth>
                            {!isNew ? "Already Exists" : "New"}
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button type="submit" variant="contained" color="success" fullWidth>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </form>
    );
};

export default AddEditCustomer;
