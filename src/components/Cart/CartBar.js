import { Box, Drawer, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

const CartBar = (props) => {
    const { drawerWidth } = props;
    const { items: cartItems, totalQuantity, total } = useSelector((state) => state.cart);

    return <Drawer
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: '#ABAAAA',
                position: 'inherit'
            },
        }}
        variant="permanent"
        anchor="right"
    >
        <Typography variant="h4" component='h4' textAlign={'center'} my={2}>My Cart ({totalQuantity})</Typography>
        {cartItems.length > 0 ?
            cartItems.map(item => {
                return <CartItem key={item.id} product={item} />
            }) :
            <Typography variant="body1" textAlign='center' my={5}>Cart is currently empty.</Typography>
        }
        {cartItems.length > 0 ? <Stack mt={3} px={2} direction='row' justifyContent='space-between'>
            <Box>
                <Typography variant='h6'>Total:</Typography>
            </Box>
            <Box>
                <Typography variant='h6'>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
                        .format(total)}
                </Typography>
            </Box>
        </Stack> : null}
    </Drawer>
}

export default CartBar;