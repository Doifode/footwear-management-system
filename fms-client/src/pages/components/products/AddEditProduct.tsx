import { Autocomplete, Box, Button, Grid2, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { manageDiscount } from '../../../helper/Functions';
import { IRegisterProduct, ISizeType } from '../../../helper/types/Product';
import { useGetAllArticlesQuery } from '../../../redux/api/ArticleApi';
import { useGetAllCategoriesQuery } from '../../../redux/api/CategoryApi';
import { useGetAllColorsQuery } from '../../../redux/api/ColorApi';
import { useAddProductMutation, useDeleteProductMutation, useGetProductSizeListMutation, useUpdateProductMutation } from '../../../redux/api/ProductApi';
import FMSConfirmationPopup from '../../../utils/common/FMSConfirmationPopup';


const initialProductValues: IRegisterProduct = {
    productId: 0,
    productName: '',
    articleId: 0,
    categoryId: 0,
    quantity: 1,
    mrp: 0,
    actualPrice: 0,
    discount: 0,
    size: 5,
    shopId: 0,
    colorId: 0,
    sellingPrice: 0,
    offeredDiscount: 0
};

const validationSchema = Yup.object({
    productName: Yup.string().required('Product Name is required'),
    articleId: Yup.number().notOneOf([0], "Please select article.").required('Article is required'),
    categoryId: Yup.number().notOneOf([0], "Please select category.").required('Category is required'),
    quantity: Yup.number().positive().required('Quantity is required').min(1, 'Must be at least 1'),
    mrp: Yup.number().positive()
        .notOneOf([0], "Please enter MRP greater than 0.")
        .required('MRP is required')
        .min(1, 'Must be a positive number')
        .test('mrp-greater-than-actual', 'MRP should not be less than the Actual Price', function (value) {
            return value >= this.parent.actualPrice;
        }),
    actualPrice: Yup.number().positive().required('Actual Price is required').min(1, 'Must be a positive number'),
    sellingPrice: Yup.number().positive()
        .required('Selling Price is required')
        .test('selling-price-greater-than-actual', 'Selling Price should not be less than the Actual Price', function (value) {
            return value >= this.parent.actualPrice;
        }),
    discount: Yup.number().min(0, 'Discount cannot be negative'),
    size: Yup.number().notOneOf([0], "Enter size greater than 0.").required('Size is required').positive(),
    colorId: Yup.number().notOneOf([0], "Please select color.").required('Color is required'),
});


const AddEditProductForm = () => {
    const { data } = useGetAllCategoriesQuery(null);
    const { data: articleList } = useGetAllArticlesQuery(null,);
    const { data: colorList } = useGetAllColorsQuery(null, {});
    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const [sizeArray, setSizeArray] = useState<ISizeType[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const [sizeObj, setSizeObj] = useState<ISizeType>({
        size: 0,
        productId: 0,
        isAdded: false,
        isEditing: false,
        quantity: 0
    })
    const [addProduct] = useAddProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const navigate = useNavigate();
    const [getProductSizeList] = useGetProductSizeListMutation()
    const editProductData: { state: IRegisterProduct | null } = useLocation();
    const [deleteProduct] = useDeleteProductMutation()

    const formik = useFormik({
        initialValues: initialProductValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setIsFormDisabled(true);
            if (isFormDisabled) {
                handleApiCall(values);
            }
        },
        onReset() {
            setIsFormDisabled(false);
        },
    });

    const handleSellingPrice = (e: ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
        const isMrp = e.target.name === "mrp"
        const value = isMrp ? Number(formik.values.discount) : Number(e.target.value);
        const totalValue = isMrp ? Number(e.target.value) : formik.values.mrp
        if (value < 0) return;
        const finalValue = manageDiscount(value, totalValue)
        formik.setFieldValue("sellingPrice", finalValue);
    }

    const handleSizeArrayAdded = (index: number, isAdded: boolean = false, isEditing: boolean = false) => {
        setSizeArray((pre) => {
            return pre.map((item, innerIndex) => {
                if (index === innerIndex) {
                    setSizeObj(item)
                    return { ...item, isAdded, isEditing }
                } else {
                    return item;
                }
            })
        })
    }

    const handleUpdateSizeArray = (index: number, size: number, quantity: number) => {
        const filteredSize = sizeArray.filter((item) => item.size === Number(size))
        const findIndex = sizeArray.findIndex((item) => item.size == size)
        if (filteredSize.length && index != findIndex) {
            toast.info("This size has been already added.")
            return
        }
        setSizeArray((pre) => {
            return pre.map((item, innerIndex) => {
                if (index === innerIndex) {
                    return { ...item, size, quantity, isEditing: false }
                } else {
                    return item;
                }
            })
        })
    }

    const handleDeleteProduct = async () => {
        try {
            const { data } = await deleteProduct({ productId: sizeObj.productId })
            if (data?.success) {
                toast.success(data.message);
                setIsOpen(false);
                setSizeArray((pre) => pre.filter((item) => item.productId != sizeObj.productId))
            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleApiCall = async (Product: IRegisterProduct) => {
        try {
            sizeArray.forEach(async (item, index) => {
                const productValue: IRegisterProduct = { ...Product, size: item.size, quantity: item.quantity };
                const productEditValue: IRegisterProduct = { ...Product, size: item.size, quantity: item.quantity, productId: item.productId || 0 };
                if (item.productId !== 0) {
                    const { data } = await updateProduct(productEditValue);
                    if (data?.success) {
                        handleSizeArrayAdded(index, true);
                        if (index === (sizeArray.length - 1)) {
                            toast.success("Products updated successfully.");
                            navigate("/product-list");
                        }
                    } else {
                        toast.error(data?.message);
                        setSizeArray([])
                        return;
                    }
                } else {
                    const { data } = await addProduct(productValue);
                    if (data?.success) {
                        handleSizeArrayAdded(index, true);
                        if (index === (sizeArray.length - 1)) {
                            toast.success("Products added successfully.");
                            navigate("/product-list");
                        }
                    } else {
                        toast.error(data?.message);
                        setSizeArray([])
                        return;
                    }
                }

            });
        } catch (error) {
            console.log(error);
        }
    }

    const getAllProductSizes = async (product: IRegisterProduct) => {
        try {
            const { data } = await getProductSizeList(product);
            if (data?.success) {
                setSizeArray(data.data);
                formik.setValues(product);
                formik.setFieldValue('categoryId', product?.categoryId)
                setIsFormDisabled(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (editProductData.state) {
            getAllProductSizes(editProductData.state);
        }
    }, []);

    return (
        <Box component="form" aria-disabled={true} padding={5} onReset={formik.handleReset} onSubmit={formik.handleSubmit} >
            <Grid2 container spacing={2}>
                <Grid2 size={3}>
                    <TextField
                        fullWidth
                        disabled={isFormDisabled}
                        id="productName"
                        name="productName"
                        label="Product Name"
                        value={formik.values.productName}
                        onChange={formik.handleChange}
                        error={formik.touched.productName && Boolean(formik.errors.productName)}
                        helperText={formik.touched.productName && formik.errors.productName}
                    />
                </Grid2>
                <Grid2 size={3}>
                    <Autocomplete
                        fullWidth
                        disabled={isFormDisabled}
                        options={articleList?.data || []}
                        getOptionLabel={(option) => option.articleName}
                        value={{ articleId: formik.values.articleId, articleName: formik.values?.articleName || "" }}
                        onChange={(_, value) => {
                            formik.setFieldValue('articleId', value?.articleId)
                            formik.setFieldValue('articleName', value?.articleName)
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Article"
                                error={formik.touched.articleId && Boolean(formik.errors.articleId)}
                                helperText={formik.touched.articleId && formik.errors.articleId}
                            />
                        )}
                    />
                </Grid2>
                <Grid2 size={3}>
                    <Autocomplete
                        fullWidth
                        disabled={isFormDisabled}
                        options={data?.data || []}
                        value={{ categoryId: formik.values.categoryId, categoryName: formik.values?.categoryName || "" }}
                        getOptionLabel={(option) => option.categoryName}
                        onChange={(_, value) => {
                            formik.setFieldValue('categoryId', value?.categoryId)
                            formik.setFieldValue('categoryName', value?.categoryName)
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Category"
                                error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                                helperText={formik.touched.categoryId && formik.errors.categoryId}
                            />
                        )}
                    />
                </Grid2>
                <Grid2 size={3}>
                    <Autocomplete
                        fullWidth
                        disabled={isFormDisabled}
                        options={colorList?.data || []}
                        getOptionLabel={(option) => option.colorName}
                        value={{ colorId: formik.values.colorId, colorName: formik.values?.colorName || "", colorCode: "" }}
                        onChange={(_, value) => {
                            formik.setFieldValue('colorId', value?.colorId)
                            formik.setFieldValue('colorName', value?.colorName)
                            formik.setFieldValue('colorCode', value?.colorCode)
                        }
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Color"
                                error={formik.touched.colorId && Boolean(formik.errors.colorId)}
                                helperText={formik.touched.colorId && formik.errors.colorId}
                            />
                        )}
                    />
                </Grid2>
                <Grid2 size={3}>
                    <TextField
                        fullWidth
                        disabled={isFormDisabled}
                        id="actualPrice"
                        name="actualPrice"
                        label="Actual Price"
                        type="number"
                        value={formik.values.actualPrice}
                        onChange={formik.handleChange}
                        error={formik.touched.actualPrice && Boolean(formik.errors.actualPrice)}
                        helperText={formik.touched.actualPrice && formik.errors.actualPrice}
                    />
                </Grid2>
                <Grid2 size={3}>
                    <TextField
                        fullWidth
                        disabled={isFormDisabled}
                        id="mrp"
                        name="mrp"
                        label="MRP"
                        type="number"
                        value={formik.values.mrp}
                        onChange={handleSellingPrice}
                        error={formik.touched.mrp && Boolean(formik.errors.mrp)}
                        helperText={formik.touched.mrp && formik.errors.mrp}
                    />
                </Grid2>
                <Grid2 size={3}>
                    <TextField
                        fullWidth
                        disabled={isFormDisabled}
                        id="discount"
                        name="discount"
                        label="Discount (%)"
                        type="number"
                        value={formik.values.discount}
                        onChange={handleSellingPrice}
                        error={formik.touched.discount && Boolean(formik.errors.discount)}
                        helperText={formik.touched.discount && formik.errors.discount}
                    />
                </Grid2>
                <Grid2 size={3}>
                    <TextField
                        fullWidth
                        disabled
                        id="sellingPrice"
                        name="sellingPrice"
                        label="sellingPrice "
                        type="number"
                        value={formik.values.sellingPrice}
                        onChange={formik.handleChange}
                        error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
                        helperText={formik.touched.sellingPrice && formik.errors.sellingPrice}
                    />
                </Grid2>
            </Grid2>
            <Grid2 marginTop={2} marginBottom={2} container gap={2}>
                <Grid2 size={2} hidden={!isFormDisabled}>
                    <TextField
                        fullWidth
                        id="size"
                        name="size"
                        label="Size"
                        size="small"
                        type="number"
                        value={formik.values.size}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            if (sizeArray.filter((item) => item.size === Number(e.target.value)).length) {
                                toast.info("This size has been already added.")
                                return
                            } else {
                                formik.handleChange(e)
                            }
                        }}
                        error={formik.touched.size && Boolean(formik.errors.size)}
                        helperText={formik.touched.size && formik.errors.size}
                    />
                </Grid2>
                <Grid2 size={2} hidden={!isFormDisabled}>
                    <TextField
                        fullWidth
                        id="quantity"
                        name="quantity"
                        label="Quantity"
                        size="small"
                        type="number"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        error={formik.touched.quantity && Boolean(formik.errors.quantity)}
                        helperText={formik.touched.quantity && formik.errors.quantity}
                    />
                </Grid2>
                <Grid2 size={2} hidden={!isFormDisabled}>
                    <Button type="button" onClick={() => {
                        if (sizeArray.filter((item) => item.size === Number(formik.values.size)).length) {
                            toast.info("This size has been already added.")
                            return
                        } else {
                            setSizeArray((pre) => {
                                return [...pre, { size: formik.values.size, quantity: formik.values.quantity, isAdded: false, productId: 0, isEditing: false }]
                            })
                        }

                    }} > Add </Button>
                </Grid2>
                <Grid2 size={4}>
                    <Button hidden={isFormDisabled} className='mx-2' color="primary" variant="contained" type="submit">
                        Product Confirm
                    </Button>
                    <Button hidden={!isFormDisabled} color="success" variant="contained" type="button" onClick={() => setIsFormDisabled(false)}>
                        Make Changes
                    </Button>
                    <Button hidden={isFormDisabled} color="error" variant="contained" type="button" onClick={() => formik.resetForm()} >
                        Reset Form
                    </Button>
                </Grid2>
            </Grid2>

            <table hidden={!sizeArray.length} className='table table-bordered table-hover table-dark px-3'>
                <tbody>
                    <th>
                        Size
                    </th>
                    <th>
                        Quantity
                    </th>
                    <th>
                        Action
                    </th>
                    <th>
                        IsAdded
                    </th>
                    {sizeArray.map((item, indexVal) => {
                        return <tr>
                            <td>
                                {!item.isEditing ? item.size : ""}
                                <input hidden={!item.isEditing} type="number" value={sizeObj.size} onChange={(e) => setSizeObj({ ...sizeObj, size: Number(e.target.value) })} />
                            </td>
                            <td>
                                <input hidden={!item.isEditing} type="number" value={sizeObj.quantity} onChange={(e) => setSizeObj({ ...sizeObj, quantity: Number(e.target.value) })} />
                                {!item.isEditing ? item.quantity : ""}
                            </td>
                            <td>
                                <Button hidden={item.productId > 0} onClick={() => setSizeArray((pre) => {
                                    return pre.filter((_, index) => index != indexVal);
                                })}>Remove</Button>
                                <Button color="error" hidden={item.productId == 0} onClick={
                                    () => {
                                        setSizeObj(item);
                                        setIsOpen(true)
                                    }
                                }>Delete  </Button>
                                <Button hidden={item.isEditing} onClick={() => handleSizeArrayAdded(indexVal, false, true)}>Edit</Button>
                                <Button hidden={!item.isEditing} onClick={() => handleUpdateSizeArray(indexVal, sizeObj.size, sizeObj.quantity)}>Add</Button>
                            </td>
                            <td>
                                {item.isAdded ? "Yes" : "No"}
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <Button variant='contained' color='success' type='submit' hidden={!isFormDisabled}>{editProductData.state ? " Update" : "Add"}All Size Products</Button>

            <FMSConfirmationPopup
                open={isOpen} onClose={() => setIsOpen(false)}
                onCancel={() => setIsOpen(false)}
                onConfirm={handleDeleteProduct}
                title={"Confirmation"}
                subMessage={`Are you sure you want to delete this product with size ${sizeObj.size} and quantity ${sizeObj.quantity}?`}
            />
        </Box>
    );
};

export default AddEditProductForm;
