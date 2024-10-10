import { Autocomplete, Button, Grid2, TextField } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { IGetProductBilling, IRegisterProduct } from '../../helper/types/Product';
import { useGetAllArticlesQuery } from '../../redux/api/ArticleApi';
import { useGetAllColorsQuery } from '../../redux/api/ColorApi';
import { useGetProductForBillingMutation } from '../../redux/api/ProductApi';


interface FilterProductProps {
    setBillingArray: any,
    setLoading: any
}

const FilterProduct: React.FC<FilterProductProps> = ({ setBillingArray, setLoading }) => {

    const { data: articleList } = useGetAllArticlesQuery(null,);
    const { data: colorList } = useGetAllColorsQuery(null, {});
    const [searchProduct] = useGetProductForBillingMutation();
    const [filterData, setFilteredData] = useState<IGetProductBilling>({ articleId: 0, size: "", colorId: 0, articleName: "", colorName: "", colorCode: "" });

    const handleSearch = async () => {
        if (!filterData.articleId || !filterData.colorId || !filterData.size) {
            toast.warning("Please select all fields.");
            return;
        }
        try {
            setLoading(true)
            const { articleName, colorName, colorCode, ...dataVal } = { ...filterData, size: Number(filterData.size) }
            const { data } = await searchProduct(dataVal)
            if (data?.success) {
                if (data?.data.length == 1) {
                    setBillingArray((pre: IRegisterProduct[]) => {
                        const modifiedData = data.data.map((item) => ({ ...item, finalPrice: item.sellingPrice, quantity: 1 }))
                        return [...modifiedData, ...pre]
                    });
                    setFilteredData({ articleId: 0, size: "", colorId: 0, articleName: "", colorName: "", colorCode: "" })
                }
            } else {
                toast.error(data?.message)
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    return (
        <Grid2 container spacing={2} display={"flex"} marginY={2} justifyContent={"space-between"} >
            <Grid2 size={3}>
                <Autocomplete
                    fullWidth
                    size="small"
                    options={articleList?.data || []}
                    getOptionLabel={(option) => option.articleName}
                    onChange={(_, value) => {
                        setFilteredData({ ...filterData, articleName: value?.articleName || "", articleId: value?.articleId || 0 });
                    }}
                    value={{ articleName: filterData.articleName, articleId: filterData.articleId }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Article"
                        />
                    )}
                />
            </Grid2>
            <Grid2 size={3}>
                <TextField
                    size='small'
                    type='number'
                    label="Size"
                    fullWidth
                    value={filterData.size}
                    onChange={(value) => {
                        setFilteredData({ ...filterData, size: value.target.value });
                    }}
                />
            </Grid2>
            <Grid2 size={3}>
                <Autocomplete
                    fullWidth
                    options={colorList?.data || []}
                    getOptionLabel={(option) => option.colorName}
                    onChange={(_, value) => {
                        setFilteredData({ ...filterData, colorName: value?.colorName || "", colorId: value?.colorId || 0, colorCode: value?.colorCode || "" })
                    }}
                    value={{ colorName: filterData.colorName, colorId: filterData.colorId, colorCode: filterData.colorCode }}
                    size="small"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Color"
                        />
                    )}
                />
            </Grid2>
            <Grid2 size={3}>
                <Button fullWidth variant='contained' onClick={handleSearch}>Get Product</Button>
            </Grid2>
        </Grid2>
    )
}

export default FilterProduct