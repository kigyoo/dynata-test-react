import { Box, CssBaseline } from '@mui/material';
import CartBar from '../Cart/CartBar';
import MainHeader from './MainHeader';

const drawerWidth = 320;

const Layout = (props) => {
    return (
        <Box sx={{ display: 'flex', minHeight: "100vh" }}>
            <CssBaseline />
            <MainHeader drawerWidth={drawerWidth} />
            <Box
                component="main"
                sx={{ flexGrow: 1, backgroundColor: '#3f3f3f', paddingTop: '5rem' }}
            >
                {props.children}
            </Box>
            <CartBar drawerWidth={drawerWidth} />
        </Box>
    );
};

export default Layout;
