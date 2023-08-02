import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getCategoryTree } from '../store/categoriesSlice';
import LoaderErrorContainer from '../components/Layout/LoaderErrorContainer';
import CategoryRecursive from '../components/Shop/CategoryRecursive';

const CategoriesPage = () => {
    const dispatch = useDispatch();
    const { items: categoryTree, isLoading, hasError } = useSelector(state => state.categories.tree);

    useEffect(() => {
        dispatch(getCategoryTree());
        dispatch(getCategories());
    }, [dispatch])

    if (isLoading || hasError) {
        return <LoaderErrorContainer hasError={hasError} />;
    }

    return (
        <section style={{ padding: '2%' }}>
            <Typography color='white' variant='h4' component='h1' gutterBottom textAlign='center'>
                Categories
            </Typography>
            <CategoryRecursive children={categoryTree} />
        </section>
    );
};

export default CategoriesPage;
