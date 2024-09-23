export const routerLinks = [
    {
        label: "Dashboard",
        path: "/",
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
                label: "All Shops",
                path: "/shop-list",
            },
        ]
    }
]