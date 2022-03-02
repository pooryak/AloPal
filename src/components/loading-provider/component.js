import PropTypes from 'prop-types';
import { Player } from '@lottiefiles/react-lottie-player';

function Loading({ condition, children, render }) {
    if (!condition) {
        return children || (render && render());
    }
    return (
        <Player
            autoplay
            loop
            src="/assets/animations/41251-loading-3-lines.json"
            style={{ height: '300px', width: '300px' }}
        />
    );
}

Loading.propTypes = {
    condition: PropTypes.any,
    render: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

Loading.defaultProps = {
    condition: null,
    render: null,
    children: null,
};

export default Loading;
