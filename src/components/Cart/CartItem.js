import { DeleteForever } from "@mui/icons-material";
import { Box, Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../store/cartSlice";

const CartItem = (props) => {
    const { product } = props;
    const dispatch = useDispatch();

    const removeFromCartHandler = () => {
        dispatch(
            removeItemFromCart(product.id)
        );
    }

    return (
        <Card sx={{ minWidth: 275, m: 1 }}>
            <CardContent>
                <Typography fontSize='large' sx={{ mb: 1.5 }} color="text.secondary">
                    {product.name.toUpperCase()}
                </Typography>
                <Typography variant="body">
                    x{product.quantity} = {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
                        .format(product.quantity * product.price)}
                </Typography>
            </CardContent>
            <CardActions>
                {/* <IconButton color='primary' size='large' aria-label="decrease">
                    <IndeterminateCheckBox fontSize="inherit" />
                </IconButton>

                <IconButton color='primary' size='large' aria-label="increase">
                    <AddBox fontSize="inherit" />
                </IconButton> */}
                <Box flexGrow={1} textAlign='right'>
                    <IconButton
                        color='error'
                        aria-label="delete"
                        onClick={removeFromCartHandler}
                    >
                        <DeleteForever />
                    </IconButton>
                </Box>
            </CardActions>
        </Card>
    );
};

export default CartItem;
