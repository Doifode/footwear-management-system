import { Box, Button, Grid2 as Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { ChangeEvent, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { apiResponse } from '../../../helper/types/CommonTypes';
import { IRegisterUser } from '../../../helper/types/User';
import apiClient from '../../../httpConfig/apiInClient';
import { getShopByIdRoute, registerUpdateUserRoute } from '../../../httpConfig/ApiRoutes';
import FMSFormCard from '../../common/FMSFormCard';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    mobileNo: Yup.string().required('Mobile Number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    userName: Yup.string().required('User Name is required'),
    roleId: Yup.number().notOneOf([0], "Role is required.").required('Role is required'),
});

const AddEditUser: React.FC = () => {
    const params = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { state } = useLocation();

    const handleRegisterUser = async (values: IRegisterUser) => {
        try {
            const activateUrl = `${window.location.origin}/auth/activate-user`
            const data = { ...values, shopId: state.shopId, createdBy: 1, activateUrl }; // Set createdBy to 1
            const registerUserResponse = await apiClient.post<{ data: any, message: string, success: boolean }>(registerUpdateUserRoute, data);
            if (registerUserResponse.data.success) {
                toast.success(registerUserResponse.data.message);
                navigate(`/user-list`, { state });
            } else {
                toast.error(registerUserResponse.data.message)
            }
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            resetForm();
        }
    };

    const handleUpdateShop = async (values: IRegisterUser) => {
        try {
            const data = { ...values, shopId: state.shopId, createdBy: 1 }; // Set createdBy to 1
            const registerUserResponse = await apiClient.put<{ data: any, message: string, success: boolean }>(registerUpdateUserRoute, data);
            if (registerUserResponse.data.success) {
                toast.success(registerUserResponse.data.message);
                navigate(`/user-list`, { state });
                resetForm();
            } else {
                toast.error(registerUserResponse.data.message);
            }
        } catch (error) {
            toast.error("Something went wrong.")
        }
    };

    const formik = useFormik<IRegisterUser>({
        initialValues: {
            firstName: '',
            lastName: '',
            shopId: 0,
            mobileNo: '',
            email: '',
            userName: '',
            roleId: 0
            // Remove unused fields
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values: IRegisterUser) => {
            if (params.id) {
                return handleUpdateShop(values);
            } else {
                return handleRegisterUser(values);
            }
        }
    });

    const {
        values,
        errors,
        touched,
        setValues,
        handleChange,
        handleSubmit,
        handleReset,
        handleBlur,
        resetForm
    } = formik;

    const handleSpace = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === " ") {
            return
        } else {
            return handleChange(e);
        }
    }

    const getShopById = async () => {
        try {
            const getShopByIdResponse = await apiClient.get<apiResponse<IRegisterUser>>(`${getShopByIdRoute}${params.id}`);
            if (getShopByIdResponse.data.success) {
                if (getShopByIdResponse.data.data) {
                    setValues(getShopByIdResponse.data.data);
                }
            }
        } catch (error) {
            // Handle error
        }
    }

    useEffect(() => {
        if (params.id) {
            getShopById();
        }
    }, []);

    return (

        <FMSFormCard title={params?.id ? `Update Shop In ${state?.shopName}` : ` Add User In ${state?.shopName}`}>
            <Box display="flex" justifyContent="center" alignItems="center">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <TextField
                                size="small"
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={values.firstName.trim()}
                                onChange={handleSpace}
                                onBlur={handleBlur}
                                error={touched.firstName && Boolean(errors.firstName)}
                                helperText={touched.firstName && errors.firstName}
                            />
                        </Grid>

                        <Grid size={6}>
                            <TextField
                                size="small"
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={values.lastName.trim()}
                                onChange={handleSpace}
                                onBlur={handleBlur}
                                error={touched.lastName && Boolean(errors.lastName)}
                                helperText={touched.lastName && errors.lastName}
                            />
                        </Grid>

                        <Grid size={6}>
                            <TextField
                                size="small"
                                fullWidth
                                label="User Name"
                                name="userName"
                                value={values.userName.trim()}
                                onChange={handleSpace}
                                onBlur={handleBlur}
                                error={touched.userName && Boolean(errors.userName)}
                                helperText={touched.userName && errors.userName}
                            />
                        </Grid>

                        <Grid size={6}>
                            <TextField
                                size="small"
                                fullWidth
                                label="Mobile Number"
                                name="mobileNo"
                                value={values.mobileNo.trim()}
                                onChange={handleSpace}
                                onBlur={handleBlur}
                                error={touched.mobileNo && Boolean(errors.mobileNo)}
                                helperText={touched.mobileNo && errors.mobileNo}
                            />
                        </Grid>

                        <Grid size={6}>
                            <TextField
                                size="small"
                                fullWidth
                                label="Email"
                                name="email"
                                value={values.email.trim()}
                                onChange={handleSpace}
                                onBlur={handleBlur}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                            />
                        </Grid>

                        <Grid size={6}>
                            <Select
                                size="small"
                                fullWidth
                                label="Role"
                                name="roleId"
                                value={values.roleId}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.roleId && Boolean(errors.roleId)}
                            >
                                <MenuItem value={0}>Select Role</MenuItem>
                                <MenuItem value={2}>Admin</MenuItem>
                                <MenuItem value={3}>Sells Man</MenuItem>
                            </Select>
                            <Typography color='error' variant='caption' >{touched.roleId && errors.roleId}</Typography>

                        </Grid>

                        <Grid size={12} display="flex" justifyContent="start">
                            <Button className='mx-2' type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                            <Button className='mx-2' onClick={handleReset} variant="outlined" color="secondary">
                                Reset
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </FMSFormCard>
    );
};

export default AddEditUser;
