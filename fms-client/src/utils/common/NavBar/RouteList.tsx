import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SetPassword from '../../../pages/components/auth/SetPassword'
import Dashboard from './Dashboard'
import AddEditShop from '../../../pages/components/shop/AddEditShop'
import FMSProtectRout from '../FMSProtectRout'
import ShopsTable from '../../../pages/components/shop/ShopsTable'
import AddEditUser from '../../../pages/components/user/AddEditUser'
import UserTable from '../../../pages/components/user/UsersTable'
import FMSPageNotFound from '../FMSPageNotFound'
import AuthLayout from '../../../pages/components/auth/AuthLayout'
import Login from '../../../pages/components/auth/Login'


const RouteList = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/auth' element={<AuthLayout />}>
                        <Route path="/auth/activate-user/:token" element={<SetPassword />}></Route>
                        <Route path="/auth/login" element={<Login />}></Route>
                    </Route>
                    <Route path='/' element={<FMSProtectRout children={<Dashboard />} />}>
                        <Route path='/add-shop' element={<AddEditShop />}></Route>
                        <Route path='/update-shop/:id' element={<AddEditShop />}></Route>
                        <Route path='/shop-list' element={<ShopsTable />}></Route>
                        <Route path='/add-user' element={<AddEditUser />}></Route>
                        <Route path='/add-user/:id' element={<AddEditUser />}></Route>
                        <Route path='/update-user/:id' element={<AddEditUser />}></Route>
                        <Route path='/user-list' element={<UserTable />}></Route>
                    </Route>
                    <Route path='*' element={<FMSPageNotFound />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RouteList