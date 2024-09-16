import { Box, Button, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import FMSFormCard from '../../common/FMSFormCard';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object({
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    identifier: Yup.string()
        .required('Username Or Email is required.'),
    shopUserName: Yup.string().required("Shop Username is required.")
});

const Login = () => {
    const LoginHandler = () => { };

    return (
        <FMSFormCard title='Login' containerClass='w-75'>
            <Formik
                initialValues={{ identifier: "", shopUserName: "", password: '', }}
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
                                name="shopUserName"
                                label="Shop Username"
                                type="shopUserName"
                                fullWidth
                                error={touched.shopUserName && Boolean(errors.shopUserName)}
                                helperText={touched.shopUserName && errors.shopUserName}
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
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </FMSFormCard >

    );
};

export default Login;
