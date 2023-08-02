import { ChevronLeft } from '@mui/icons-material';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import LoaderErrorContainer from '../components/Layout/LoaderErrorContainer';
import Product from '../components/Shop/Product';

const SearchPage = () => {
  let { state } = useLocation();
  const { searchText } = state;
  const navigate = useNavigate();
  const { tree, list } = useSelector(state => state.categories);
  const { items: treeItems, isLoading: treeIsLoading, hasError: treeHasError } = tree;
  const { items: listItems, isLoading: listIsLoading, hasError: listHasError } = list;
  const [orderBy, setOrderBy] = useState('none');

  const visibleProducts = useMemo(() => {
    const foundProducts = [];

    const getFilteredProducts = (items, searchText) => {
      selectProductsRecursive(items, searchText);
      return foundProducts;
    }

    const selectProductsRecursive = (children, searchText, name) => {
      children.map(item => {
        if (item.children?.length > 0) {
          return selectProductsRecursive(item.children, searchText, item.name);
        }
        if (item.type === 'PRODUCT' && item.name.includes(searchText)) {
          foundProducts.push({ ...item, parent: name });
        }
        return item;
      })
    }

    getFilteredProducts(treeItems, searchText);
    return foundProducts;
  }, [treeItems, searchText]);

  const sortProducts = (sortBy) => {
    if (sortBy === 'none') {
      return null;
    }

    const sort = sortBy.split('-');

    visibleProducts.sort((a, b) => {
      if (a[sort[0]] < b[sort[0]]) {
        return sort[1] === 'asc' ? -1 : 1;
      }

      if (a[sort[0]] > b[sort[0]]) {
        return sort[1] === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }

  const getParentPath = (parent) => {
    const parentCategory = listItems.find(item => item.name === parent);
    if (parentCategory.parent === '') {
      return [parent];
    }
    return [...parentCategory.parent.split('/'), parent];
  }

  if (treeIsLoading || listIsLoading || treeHasError || listHasError) {
    return <LoaderErrorContainer hasError={treeHasError || listHasError} />;
  }

  return (
    <Box sx={{ paddingX: 5, paddingY: 2 }}>
      <Button
        variant='text'
        size='medium'
        startIcon={<ChevronLeft />}
        onClick={() => {
          navigate('/')
        }}
      >
        back to categories
      </Button>

      <Stack direction='row' justifyContent='space-between'>
        <Typography variant='h4' sx={{ mt: 1, color: 'whitesmoke' }}>
          Searched for: <Typography variant='h4' component='div' display={'inline'} fontWeight={500}>{searchText}</Typography>
        </Typography>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="order-by-label" sx={{ color: 'whitesmoke' }}>Order by</InputLabel>
          <Select
            labelId="order-by-label"
            id="order-by"
            value={orderBy}
            label="Order by"
            sx={{
              color: 'whitesmoke',
              borderColor: 'whitesmoke',
              '.MuiOutlinedInput-notchedOutline': {
                borderWidth: 1,
                borderColor: 'whitesmoke'
              },
              '.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'whitesmoke'
              },
              '.MuiSelect-icon': {
                color: 'inherit'
              }
            }}
            onChange={(e) => {
              setOrderBy(e.target.value);
              sortProducts(e.target.value);
            }}
          >
            <MenuItem value='none' selected>Select ordering</MenuItem>
            <MenuItem value='name-asc'>Name (asc)</MenuItem>
            <MenuItem value='name-desc'>Name (desc)</MenuItem>
            <MenuItem value='price-asc'>Price (asc)</MenuItem>
            <MenuItem value='price-desc'>Price (desc)</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {
        visibleProducts.length > 0 ?
          <Box sx={{ mt: 3, display: 'grid', gap: 5, gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {visibleProducts.map(product =>
              <Product
                key={product.id}
                name={product.name}
                price={product.price}
                id={product.id}
                parents={getParentPath(product.parent)}
                showBreadcrumbs
              />
            )}
          </Box>
          : null
      }
    </Box >
  );
};

export default SearchPage;
