import { Menu } from '@mui/icons-material';
import { AppBar, Box, Button, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const navItems = [
    { title: 'Home', link: '/admin' },
    { title: 'New category', link: '/admin/categories' },
    { title: 'New product', link: '/admin/products' }
];

const AdminLayout = (props) => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                component="nav"
                sx={{
                    justifyContent: 'center'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        // onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                        variant="h4"
                        noWrap
                        component="h1"
                        sx={{ flexGrow: 1, height: '5rem', display: { xs: 'none', sm: 'inherit' } }}
                        alignItems='center'
                    >
                        Dynata Admin Console
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item.title} sx={{ color: '#fff' }} onClick={() => navigate(item.link)}>
                                {item.title}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ ml: 10 }}>
                        <Button variant='contained' color='info' sx={{ color: '#fff' }} onClick={() => navigate('/')}>
                            public page
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', pt: '6rem', backgroundColor: 'honeydew', flex: 1, height: '100vh', alignItems: 'center' }}>
                {props.children}
            </Box>
        </Box>
    );
};

export default AdminLayout;
