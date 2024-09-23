import { Box, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { IUserLogin } from '../../../helper/types/Auth';
import { useVerifyUserMutation } from '../../../redux/api/AuthApi';
import { setUserDetailsAction } from '../../../redux/slice/Auth';
import FMSFormCard from '../../../utils/common/FMSFormCard';
import FMSLoadingButton from '../../../utils/common/FMSLoadingButton';

const validationSchema = Yup.object({
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    identifier: Yup.string()
        .required('Username Or Email is required.'),
});

const Login = () => {
    const [verifyUser, { isLoading }] = useVerifyUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const LoginHandler = async (values: IUserLogin) => {
        const { data } = await verifyUser(values);
        if (data?.success) {
            toast.success(data.message);
            navigate("/");
            dispatch(setUserDetailsAction(data.data))
        } else {
            toast.error(data?.message);
        }
    };

    return (
        <FMSFormCard title='Login' containerClass='w-75'>
            <Formik
                initialValues={{ identifier: "", password: '', }}
                validationSchema={validationSchema}
                onSubmit={LoginHandler}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Box mb={2}>
                            <Field
                                size="small"
                                as={TextField}
                                name="identifier"
                                label="Username / Email"
                                type="text"
                                fullWidth
                                error={touched.identifier && Boolean(errors.identifier)}
                                helperText={touched.identifier && errors.identifier}
                            />
                        </Box>
                        <Box mb={2}>
                            <Field
                                size="small"
                                as={TextField}
                                name="password"
                                label="Password"
                                type="password"
                                fullWidth
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                            />
                            <Link to={"/forgot-password"}>Forgot Password?</Link>
                        </Box>
                        <FMSLoadingButton isLoading={isLoading} label='Login' disabled={isLoading} type="submit" variant="contained" color="primary" fullWidth />
                    </Form>
                )}
            </Formik>
        </FMSFormCard >

    );
};

export default Login;
