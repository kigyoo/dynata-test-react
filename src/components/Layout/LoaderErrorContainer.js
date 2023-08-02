import { Box, CircularProgress, Typography } from '@mui/material';


const LoaderErrorContainer = (props) => {
    const { hasError } = props;

    return <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        {hasError ?
            <Typography variant="subtitle1" color='red'>Something went wrong. Please try again later!</Typography> :
            <CircularProgress />}
    </Box>;
};

export default LoaderErrorContainer;
