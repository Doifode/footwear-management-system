import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { allRoutesList } from '../../../helper/Constants'

import FMSPageNotFound from '../FMSPageNotFound'
import FMSProtectRout from '../FMSProtectRout'
import Dashboard from './Dashboard'
import AuthLayout from '../../../pages/auth/AuthLayout'
import SetPassword from '../../../pages/auth/SetPassword'
import Login from '../../../pages/auth/Login'
 

const RouteList = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/auth' element={<AuthLayout />}>
                        <Route path="/auth/activate-user/:token" element={<SetPassword />}></Route>
                        <Route path="/auth/login" element={<FMSProtectRout accessArray={[0]} children={<Login />} />}></Route>
                    </Route>
                    <Route path='/' element={<FMSProtectRout accessArray={[1, 2, 3]} children={<Dashboard />} />}>
                        {
                            allRoutesList.map((route, index) => {
                                return <Route key={index} path={route.routeName} element={<FMSProtectRout accessArray={route.accessArray} children={route.component} />}></Route>
                            })
                        }
                    </Route>
                    <Route path='*' element={
                        <FMSPageNotFound
                            navigatePath='/auth/login'
                            statusCode={404}
                            buttonLabel=' Go to Login Page'
                            subTitle="The page you're looking for doesn't exist or has been moved."
                            title="Oops! Page Not Found"
                        />}></Route >
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RouteList