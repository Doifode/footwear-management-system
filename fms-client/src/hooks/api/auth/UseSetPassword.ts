import { useMutation } from 'react-query';
import { ISetPassword } from '../../../helper/types/Auth';
import apiClient from '../../../httpConfig/apiInClient';
import { toast } from 'react-toastify';
import { apiResponse } from '../../../helper/types/CommonTypes';

const UseSetPassword = () => {
    const setPasswordQuery = (values: ISetPassword) => apiClient.put<apiResponse<[]>>("/user/setPassword", values);
    return (
        useMutation(
            setPasswordQuery, {
            onSuccess: (data) => { toast[data.data.success ? "success" : "error"](data.data.message) },
        }))
}

export default UseSetPassword