import { Autocomplete, Grid2, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IGetSizes } from '../../../helper/types/Product';
import { useGetAllArticlesQuery } from '../../../redux/api/ArticleApi';
import { useGetAllCategoriesQuery } from '../../../redux/api/CategoryApi';
import { useGetAllColorsQuery } from '../../../redux/api/ColorApi';
import { useSearchProductMutation } from '../../../redux/api/ProductApi';

interface FilterProductProps {
    setProductList: any,
    setIsLoading: any
}

const FilterProduct: React.FC<FilterProductProps> = ({ setProductList, setIsLoading }) => {

    const { data } = useGetAllCategoriesQuery(null);
    const { data: articleList } = useGetAllArticlesQuery(null,);
    const { data: colorList } = useGetAllColorsQuery(null, {});
    const [searchProduct] = useSearchProductMutation();
    const [filterData, setFilteredData] = useState<IGetSizes>({ articleId: 0, categoryId: 0, colorId: 0, productName: "", shopId: 0 });

    const handleSearch = async () => {
        setIsLoading(false)
        const { data } = await searchProduct(filterData)
        if (data?.success) {
            setProductList(data?.data);
            setIsLoading(true)
        } else {
            setIsLoading(true)
        }
    }

    useEffect(() => {
        handleSearch()
    }, [filterData])

    return (
        <Grid2 container spacing={2} display={"flex"} marginY={2} justifyContent={"space-between"} >
            <Grid2 size={3}>
                <TextField
                    fullWidth
                    size="small" label="Product Name"
                    value={filterData.productName}
                    onChange={(e) => setFilteredData({ ...filterData, productName: e.target.value })}
                />
            </Grid2>
            <Grid2 size={3}>
                <Autocomplete
                    fullWidth
                    size="small"
                    options={articleList?.data || []}
                    getOptionLabel={(option) => option.articleName}
                    onChange={(_, value) => {
                        setFilteredData({ ...filterData, articleId: value?.articleId || 0 });

                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Article"
                        />
                    )}
                />
            </Grid2>
            <Grid2 size={3}>
                <Autocomplete
                    fullWidth
                    options={data?.data || []}
                    getOptionLabel={(option) => option.categoryName}
                    onChange={(_, value) => {
                        setFilteredData({ ...filterData, categoryId: value?.categoryId || 0 })
                    }}
                    size="small"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Category"
                        />
                    )}
                />
            </Grid2>
            <Grid2 size={3}>
                <Autocomplete
                    fullWidth
                    options={colorList?.data || []}
                    getOptionLabel={(option) => option.colorName}
                    onChange={(_, value) => {
                        setFilteredData({ ...filterData, colorId: value?.colorId || 0 })
                    }}
                    size="small"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Color"
                        />
                    )}
                />
            </Grid2>
        </Grid2>
    )
}

export default FilterProduct