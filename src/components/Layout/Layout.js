import { Box } from '@mui/material';
import CartBar from '../Cart/CartBar';
import MainHeader from './MainHeader';

const drawerWidth = 320;

const Layout = (props) => {
    return (
        <Box sx={{ display: 'flex', minHeight: "100vh" }}>
            <MainHeader drawerWidth={drawerWidth} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    backgroundColor: '#3f3f3f',
                    paddingTop: '5rem',
                    width: `calc(100% - ${drawerWidth}px)`,
                }}
            >
                {props.children}
            </Box>
            <CartBar drawerWidth={drawerWidth} />
        </Box>
    );
};

export default Layout;
