import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';
import style from './style';

function TabPanel(props) {
    const {
        children, value, index, ...other
    } = props;
    const classes = style();
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            className={!props.white && classes.root}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default TabPanel;
