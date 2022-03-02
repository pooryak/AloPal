import { useToken } from 'src/utility/hooks';
import { Player } from '@lottiefiles/react-lottie-player';
import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Container } from '..';

function Authentication({ condition, children, render }) {
    const tokenStatus = useToken();
    if (tokenStatus.token?.is_login) {
        return children || (render && render());
    }
    return (
        <Container>
            <Player
                autoplay
                loop
                src="/assets/animations/no-access.json"
                style={{ height: '300px', width: '300px' }}
            />
            <Box fontWeight={500} textAlign="center">
                You don't have permission to access this page please Login
            </Box>
        </Container>
    );
}

Authentication.propTypes = {
    condition: PropTypes.any,
    render: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

Authentication.defaultProps = {
    condition: null,
    render: null,
    children: null,
};

export default Authentication;
