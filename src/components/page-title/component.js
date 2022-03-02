import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';

function PageTitle({ children }) {
    return (
        <Box data-testid="wrapper" fontSize={36} fontWeight={700} color="aloPal.dark" marginTop={1}>
            {children}
        </Box>
    );
}

PageTitle.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

PageTitle.defaultProps = {
    children: null,
};

export default PageTitle;
