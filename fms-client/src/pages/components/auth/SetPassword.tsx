import { Box, Button, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { ISetPassword } from '../../../helper/types/Auth';
import UseSetPassword from '../../../hooks/api/auth/UseSetPassword';
import FMSFormCard from '../../common/FMSFormCard';

const validationSchema = Yup.object({
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ""], 'Passwords must match')
        .required('Confirm Password is required'),
});

const SetPassword = () => {
    const params = useParams<{ token: string }>()
    const { mutate } = UseSetPassword()
    const setPasswordHandler = (values: ISetPassword) => mutate(values);

    return (
        <FMSFormCard title='Set Password' containerClass='w-75'>
            <Formik
                initialValues={{ password: '', confirmPassword: '', token: params?.token || "" }}
                validationSchema={validationSchema}
                onSubmit={setPasswordHandler}
            >
                {({ errors, touched }) => (
                    <Form>
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
                        </Box>

                        <Box mb={2}>
                            <Field
                                size="small"
                                as={TextField}
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                helperText={touched.confirmPassword && errors.confirmPassword}
                            />
                        </Box>

                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Set Password
                        </Button>
                    </Form>
                )}
            </Formik>
        </FMSFormCard >

    );
};

export default SetPassword;
