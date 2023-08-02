import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import LoaderErrorContainer from "../../components/Layout/LoaderErrorContainer";
import { addCategory, getCategories } from "../../store/categoriesSlice";
import { useNavigate } from "react-router-dom";

const AdminCategoriesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: categories, isLoading, hasError } = useSelector(state => state.categories.list);
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            name: '',
            parent: 0,
        },
    });

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])

    if (isLoading || hasError) {
        return <LoaderErrorContainer hasError={hasError} />;
    }

    const onSubmit = (data) => {
        dispatch(addCategory(data));
        reset();
        navigate('/admin');
    };

    return <>
        <Typography variant="h3" textTransform='uppercase' mt={2}>add new category</Typography>
        <Box sx={{ bgcolor: '#DDF4DE', p: 5, pb: 3, mt: 3, minWidth: '30%', borderRadius: 2, boxShadow: '0 0 15px 2px lightgrey' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={3}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: 'Category name is required.' }}
                        render={({ field }) =>
                            <TextField {...field}
                                variant="outlined"
                                label='Category name *'
                                fullWidth
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        }
                    />
                </Box>
                <Box mb={3}>
                    <Controller
                        name="parent"
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                            <FormControl fullWidth>
                                <InputLabel id="parent-label" sx={{ color: 'gray' }}>Parent</InputLabel>
                                <Select
                                    {...field}
                                    fullWidth
                                    defaultValue={0}
                                    labelId="parent-label"
                                    label="Parent"
                                >
                                    <MenuItem value={0}> - no parent selected - </MenuItem>
                                    {categories.map((category) => <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        )}
                    />
                </Box>
                <Box textAlign='center'>
                    <Button variant="contained" type="submit">save category</Button>
                </Box>
            </form>
        </Box>
    </>;
}

export default AdminCategoriesPage;