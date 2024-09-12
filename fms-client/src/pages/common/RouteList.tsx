import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddEditShop from '../components/shop/AddEditShop'
import Dashboard from '../components/Dashboard'
import ShopsTable from '../components/shop/ShopsTable'
import AddEditUser from '../components/user/AddEditUser'
import UserTable from '../components/user/UsersTable'

const RouteList = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Dashboard />}>
                        <Route path='/add-shop' element={<AddEditShop />}></Route>
                        <Route path='/update-shop/:id' element={<AddEditShop />}></Route>
                        <Route path='/shop-list' element={<ShopsTable />}></Route>
                        <Route path='/add-user' element={<AddEditUser />}></Route>
                        <Route path='/user-list' element={<UserTable />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RouteList