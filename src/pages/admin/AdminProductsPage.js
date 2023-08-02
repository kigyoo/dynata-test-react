import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoaderErrorContainer from "../../components/Layout/LoaderErrorContainer";
import { getCategories } from "../../store/categoriesSlice";
import { addProduct } from "../../store/productsSlice";
import { useNavigate } from "react-router-dom";

const AdminProductsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: categories, isLoading, hasError } = useSelector(state => state.categories.list);
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: '',
            price: '',
            parent: '',
        },
    });

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    if (isLoading || hasError) {
        return <LoaderErrorContainer hasError={hasError} />;
    }

    const onSubmit = (data) => {
        data.price = parseFloat(data.price);
        dispatch(addProduct(data));
        reset();
        navigate('/admin');
    };

    return <>
        <Typography variant="h3" textTransform='uppercase' mt={2}>add new product</Typography>
        <Box sx={{ bgcolor: '#DDF4DE', p: 5, pb: 3, mt: 3, minWidth: '30%', borderRadius: 2, boxShadow: '0 0 15px 2px lightgrey' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={3}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Product name is required.' }}
                        render={({ field }) =>
                            <TextField {...field}
                                variant="outlined"
                                label='Product name *'
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        }
                    />
                </Box>
                <Box mb={3}>
                    <Controller
                        name="price"
                        control={control}
                        rules={{
                            required: 'Price is required.',
                            valueAsNumber: 'Price should be a number.',
                            validate: (value) => value > 0 || 'Price should be a number.'
                        }}
                        render={({ field }) =>
                            <TextField {...field}
                                variant="outlined"
                                label='Price *'
                                fullWidth
                                error={!!errors.price}
                                helperText={errors.price?.message}
                            />
                        }
                    />
                </Box>
                <Box mb={3}>
                    <Controller
                        name="parent"
                        control={control}
                        rules={{ required: 'Parent category is required.' }}
                        render={({ field }) => (
                            <FormControl fullWidth>
                                <InputLabel id="parent-label" sx={{ color: 'gray' }}>Parent *</InputLabel>
                                <Select
                                    {...field}
                                    fullWidth
                                    labelId="parent-label"
                                    label="Parent *"
                                    error={!!errors.parent}
                                    helperText={errors.parent?.message}
                                >
                                    {categories.map((category) => <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        )}
                    />
                </Box>
                <Box textAlign='center'>
                    <Button variant="contained" type="submit">save product</Button>
                </Box>
            </form>
        </Box>
    </>;
}

export default AdminProductsPage;