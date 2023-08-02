import { ExpandMore, NavigateNext } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Breadcrumbs, Typography } from '@mui/material';
import CategoryRecursive from './CategoryRecursive';

const CategoryItem = (props) => {
    const { name, children, parent } = props;
    const breadcrumbs = parent.split('/');

    if (children.length === 0) {
        return null;
    }

    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id={name}
                style={{ backgroundColor: '#FABC79' }}
            >
                <Box>
                    <Typography variant='h5' component='h5'>{name.toUpperCase()}</Typography>
                    <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
                        {breadcrumbs.map((item, index) => <Typography key={index}>{item.toUpperCase()}</Typography>)}
                    </Breadcrumbs>
                </Box>
            </AccordionSummary>
            <AccordionDetails
                style={{ backgroundColor: '#575555', paddingRight: 0, paddingLeft: 20 }}
            >
                {children.length > 0 && <CategoryRecursive children={children} parents={[...breadcrumbs, name]} />}
            </AccordionDetails>
        </Accordion>
    );
};

export default CategoryItem;