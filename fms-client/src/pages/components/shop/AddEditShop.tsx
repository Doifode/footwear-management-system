import { Box, Button, Container, Grid2, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { ChangeEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { IRegisterShop } from '../../../helper/types/Shop';
import { useAddShopMutation, useLazyGetShopByIdQuery, useUpdateShopMutation } from '../../../redux/api/ShopApi';
import FMSFormCard from '../../../utils/common/FMSFormCard';

const validationSchema = Yup.object({
    shopName: Yup.string().required('Shop Name is required'),
shopUserName: Yup.string().required('User Name is required'),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
    tahsil: Yup.string().required('Tahsil is required'),
    landMark: Yup.string().required('Landmark is required'),
    city: Yup.string().required('City is required'),
    village: Yup.string().required('Village Name is required'),
});

const AddEditShop: React.FC = () => {
    const params = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [getShopByIdQuery] = useLazyGetShopByIdQuery();
    const [updateShop] = useUpdateShopMutation();
    const [addShop] = useAddShopMutation();

    const handleRegisterShop = async (values: IRegisterShop) => {
        try {
            const shop = { ...values, createdBy: 0 }
            const { data } = await addShop(shop)
            if (data?.success) {
                toast.success(data?.message);
                navigate("/shop-list");
            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            resetForm();
        }
    };

    const handleUpdateShop = async (values: IRegisterShop) => {
        try {
            const shop = { ...values, createdBy: 0 }
            const { data } = await updateShop(shop)
            if (data?.success) {
                toast.success(data?.message);
                navigate("/shop-list");
                resetForm();
            } else {
                toast.error(data?.message);
            }
        } catch (error) {
            toast.error("Something went wrong.")
        }
    };

    const formik = useFormik<IRegisterShop>({
        initialValues: {
            shopName: "",
            shopUserName: '',
            state: '',
            district: '',
            tahsil: '',
            landMark: '',
            city: '',
            village: "",
            shopId: 0,
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: (values: IRegisterShop) => {
            if (params.id) {
                return handleUpdateShop(values);
            } else {
                return handleRegisterShop(values);
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
            handleChange(e);
        }
    }

    const getShopById = async () => {
        try {
            const { data, isSuccess } = await getShopByIdQuery(params.id || "");
            if (data?.success && isSuccess) {
                setValues(data.data)
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getShopById()
    }, []);

    return (
        <Container className='d-flex justify-content-center align-items-center'>
            <FMSFormCard title={params.id ? "Update Shop" : 'Add Shop'}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <form onSubmit={handleSubmit}>
                        <Grid2 container spacing={2}>
                            <Grid2 size={6}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Shop Name"
                                    name="shopName"
                                    value={values.shopName?.trim()}
                                    onChange={handleSpace}
                                    onBlur={handleBlur}
                                    error={touched.shopName && Boolean(errors.shopName)}
                                    helperText={touched.shopName && errors.shopName}
                                />
                            </Grid2>

                            <Grid2 size={6}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="User Name"
                                    name="shopUserName"
                                    value={values.shopUserName?.trim()}
                                    onChange={handleSpace}
                                    onBlur={handleBlur}
                                    error={touched.shopUserName && Boolean(errors.shopUserName)}
                                    helperText={touched.shopUserName && errors.shopUserName}
                                />
                            </Grid2>

                            <Grid2 size={12}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="State"
                                    name="state"
                                    value={values.state?.trim()}
                                    onChange={handleSpace}
                                    onBlur={handleBlur}
                                    error={touched.state && Boolean(errors.state)}
                                    helperText={touched.state && errors.state}
                                />
                            </Grid2>

                            <Grid2 size={6}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="District"
                                    name="district"
                                    value={values.district?.trim()}
                                    onChange={handleSpace}
                                    onBlur={handleBlur}
                                    error={touched.district && Boolean(errors.district)}
                                    helperText={touched.district && errors.district}
                                />
                            </Grid2>

                            <Grid2 size={6}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Tahsil"
                                    name="tahsil"
                                    value={values.tahsil?.trim()}
                                    onChange={handleSpace}
                                    onBlur={handleBlur}
                                    error={touched.tahsil && Boolean(errors.tahsil)}
                                    helperText={touched.tahsil && errors.tahsil}
                                />
                            </Grid2>
                            <Grid2 size={6}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Village Name"
                                    name="village"
                                    value={values.village?.trim()}
                                    onChange={handleSpace}
                                    onBlur={handleBlur}
                                    error={touched.village && Boolean(errors.village)}
                                    helperText={touched.village && errors.village}
                                />
                            </Grid2>

                            <Grid2 size={6}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={values.city?.trim()}
                                    onChange={handleSpace}
                                    onBlur={handleBlur}
                                    error={touched.city && Boolean(errors.city)}
                                    helperText={touched.city && errors.city}
                                />
                            </Grid2>
                            <Grid2 size={6}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label="Landmark"
                                    name="landMark"
                                    value={values.landMark}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.landMark && Boolean(errors.landMark)}
                                    helperText={touched.landMark && errors.landMark}
                                />
                            </Grid2>
                            <Grid2 size={12} display="flex" justifyContent="start">
                                <Button className='mx-2' type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                                <Button className='mx-2' onClick={handleReset} variant="outlined" color="secondary">
                                    Reset
                                </Button>
                            </Grid2>
                        </Grid2>
                    </form>
                </Box>
            </FMSFormCard>
        </Container>
    );
};

export default AddEditShop;
