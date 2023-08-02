import { AddShoppingCart, ChevronLeft, NavigateNext } from '@mui/icons-material';
import { Container, Typography, Box, Button, Breadcrumbs } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addItemToCart } from '../store/cartSlice';

const ProductPage = () => {
  const dispatch = useDispatch();
  let { state } = useLocation();
  const { name, price, id, parents } = state;
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(
      addItemToCart({ id, name, price })
    );
  }

  return (
    <Container>
      <Box sx={{ padding: 5 }}>
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

        <Breadcrumbs color='lightgray' sx={{ mt: 3 }} separator={<NavigateNext fontSize="small" />}>
          {parents.map((item, index) => <Typography key={index} color={'lightgray'}>{item.toUpperCase()}</Typography>)}
        </Breadcrumbs>
        <Typography variant='h1' component='h1' color='white' fontWeight={500}>{name.toUpperCase()}</Typography>
        <Typography variant='h3' component='h3' color='white' fontWeight={400} mb={6}>
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}
        </Typography>
        <Button variant='contained' size='large' color='success' startIcon={<AddShoppingCart />} onClick={() => addToCartHandler()}>
          add to cart
        </Button>
      </Box>
    </Container>
  );
};

export default ProductPage;
