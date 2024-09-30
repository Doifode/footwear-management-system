import TabPanels from "../../../utils/common/TabPanel"
import ArticleTable from "./pages/Article/ArticleTable"
import BrandsTable from "./pages/Brand/BrandTable"
import CategoryTable from "./pages/Category/CategoryTable"

const ItemTabs = () => {
    const tabArray = [
        {
            label: "Category",
            component: <CategoryTable />,
            index: 0,
        },
        {
            label: "Brands",
            component: <BrandsTable />,
            index: 1,
        },
        {
            label: "Articles",
            component: <ArticleTable />,
            index: 2,
        }
    ]
    return (
        <TabPanels props={tabArray} />
    )
}

export default ItemTabs