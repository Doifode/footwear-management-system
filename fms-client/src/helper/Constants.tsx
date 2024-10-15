import Billing from "../pages/bill/Billing"
import FinalBill from "../pages/bill/FinalBill"
import BillTable from "../pages/billHistory/BillTable"
import MainBillTable from "../pages/billHistory/MainBillTable"
import ItemTabs from "../pages/components/items/ItemTabs"
import AddEditProduct from "../pages/components/products/AddEditProduct"
import ProductTable from "../pages/components/products/ProductTable"
import AddEditShop from "../pages/components/shop/AddEditShop"
import ShopsTable from "../pages/components/shop/ShopsTable"
import AddEditUser from "../pages/components/user/AddEditUser"
import UserTable from "../pages/components/user/UsersTable"


export const routes = [

    {
        title: "Shop",
        children: [
            {
                label: "Dashboard",
                path: "/",
                roleAccessArray: [1, 2, 3]
            },
            {
                label: "All Shops",
                path: "/shop-list",
                roleAccessArray: [1]
            },
            {
                label: "All Users",
                path: "/user-list",
                roleAccessArray: [2]
            },
            {
                label: "Items",
                path: "/items-list",
                roleAccessArray: [2]
            },
            {
                label: "Product List",
                path: "/product-list",
                roleAccessArray: [2, 3]
            },
            {
                label: "Bill",
                path: "/bill",
                roleAccessArray: [2, 3]
            },
            {
                label: "Bill History",
                path: "/bill-history",
                roleAccessArray: [2, 3]
            }

        ]
    }
]


export const allRoutesList = [
    {
        routeName: "/add-shop",
        component: <AddEditShop />,
        accessArray: [1]
    },
    {
        routeName: "/update-shop/:id",
        component: <AddEditShop />,
        accessArray: [1]
    },
    {
        routeName: "/shop-list",
        component: <ShopsTable />,
        accessArray: [1]
    },
    {
        routeName: "/add-user",
        component: <AddEditUser />,
        accessArray: [1, 2]
    },
    {
        routeName: "/update-user",
        component: <AddEditUser />,
        accessArray: [1, 2]
    },
    {
        routeName: "/user-list",
        component: <UserTable />,
        accessArray: [1, 2]
    },
    {
        routeName: "/items-list",
        component: <ItemTabs />,
        accessArray: [1, 2]
    },
    {
        routeName: "/product-list",
        component: <ProductTable />,
        accessArray: [2, 3]
    },
    {
        routeName: "/add-product",
        component: <AddEditProduct />,
        accessArray: [2, 3]
    },
    {
        routeName: "/update-product",
        component: <AddEditProduct />,
        accessArray: [2, 3]
    },
    {
        routeName: "/bill",
        component: <Billing />,
        accessArray: [2, 3]
    },
    {
        routeName: "/payment",
        component: <FinalBill />,
        accessArray: [2, 3]
    },
    {
        routeName: "/bill-history",
        component: <MainBillTable />,
        accessArray: [2, 3]
    },
    {
        routeName: "/bills-history",
        component: <BillTable />,
        accessArray: [2, 3]
    }
]