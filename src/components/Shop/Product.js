import { AddShoppingCart, NavigateNext } from '@mui/icons-material';
import { Breadcrumbs, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { addItemToCart } from '../../store/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Product = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name, price, id, parents, showBreadcrumbs } = props;

  const addToCartHandler = () => {
    dispatch(
      addItemToCart({ id, name, price })
    );
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent
        onClick={() => navigate('/product', { state: { name, price, id, parents } })}
        sx={{
          cursor: 'pointer'
        }}
      >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {showBreadcrumbs ?
            <Breadcrumbs color='grey' separator={<NavigateNext fontSize='6' />}>
              {parents.map((item, index) => <Typography key={index} color={'grey'} variant='body2'>{item.toUpperCase()}</Typography>)}
            </Breadcrumbs>
            : 'Product'}
        </Typography>
        <Typography variant="h5" component="div">
          {name.toUpperCase()}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Price: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
            .format(price)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant='contained'
          size='medium'
          color='success'
          startIcon={<AddShoppingCart />}
          onClick={() => addToCartHandler()}
        >
          add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;
