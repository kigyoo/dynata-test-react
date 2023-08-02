import { Box, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import LoaderErrorContainer from '../Layout/LoaderErrorContainer';
import CategoryItem from './CategoryItem';
import Product from './Product';

const CategoryRecursive = (props) => {
    const { children, parents } = props;
    const { items: categories, isLoading, hasError } = useSelector(state => state.categories.list);
    const productsInCategory = [];

    if (isLoading || hasError) {
        return <LoaderErrorContainer hasError={hasError} />;
    }

    return (
        <>
            {children.map(item => {
                if (item.type === 'CATEGORY') {
                    const current = categories.find(category => category.name === item.name);
                    return <CategoryItem key={item.name} name={item.name} children={item.children} parent={current.parent} />;
                } else if (item.type === 'PRODUCT') {
                    productsInCategory.push(item);
                }
                return null;
            })}
            {productsInCategory.length > 0 ?
                <Box sx={{ mt: 3 }}>
                    <Box
                        sx={{
                            display: 'grid',
                            pr: 2,
                            gap: 4,
                            // gridTemplateColumns: 'repeat(3, 1fr)',
                            gridTemplateColumns: { xs: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }
                        }}
                    >
                        {productsInCategory.map(product =>
                            <Product
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                id={product.id}
                                parents={parents}
                            />
                        )}
                    </Box>
                </Box> : null}
        </>
    );
};

export default CategoryRecursive;