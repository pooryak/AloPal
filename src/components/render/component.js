import PropTypes from 'prop-types';

const Render = ({ condition, children, render }) => {
    if (condition) {
        return children || (render && render());
    }
    return null;
};

Render.propTypes = {
    condition: PropTypes.any,
    render: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

Render.defaultProps = {
    condition: null,
    render: null,
    children: null,
};

export default Render;
