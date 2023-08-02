import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Button, InputBase, Toolbar, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainHeader = (props) => {
    const { drawerWidth } = props;
    const navigate = useNavigate();

    const searchInputHandler = (text) => {
        navigate('search', {
            state: {
                searchText: text
            }
        })
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: `calc(100% - ${drawerWidth}px)`,
                right: 'auto',
                backgroundColor: '#252424',
                height: '5rem',
                justifyContent: 'center'
            }}
        >
            <Toolbar>
                <Typography
                    variant="h4"
                    noWrap
                    component="h1"
                    sx={{ flexGrow: 1 }}
                >
                    Dynata Test Webshop
                </Typography>
                <Button variant='contained' onClick={() => navigate('admin')}>
                    admin console
                </Button>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(event) => {
                            searchInputHandler(event.target.value);
                        }}
                    />
                </Search>
            </Toolbar>
        </AppBar>
    );
};

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default MainHeader;
