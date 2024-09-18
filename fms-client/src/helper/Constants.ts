export const routerLinks = [
    {
        label: "Dashboard",
        path: "/",
    },
    {
        label: "Add Shop",
        path: "/add-shop",
    },
    {
        label: "All Shops",
        path: "/shop-list",
    },
]

export const routes = [

    {
        title: "Shop",
        children: [
            {
                label: "Dashboard",
                path: "/",
            },
            {
                label: "Add Shop",
                path: "/add-shop",
            },
            {
                label: "All Shops",
                path: "/shop-list",
            },
        ]
    }
]