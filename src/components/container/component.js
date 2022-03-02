import React from 'react';
import { Grid, Container as ContainerBox } from '@material-ui/core';
import PropTypes from 'prop-types';
import style from './style';

function Container(props) {
    const { children } = props;
    const classes = style();
    return (
        <Grid xs={12}>
            <ContainerBox max-width="lg" className={classes.root} {...props}>
                {children}
            </ContainerBox>
        </Grid>
    );
}

Container.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Container;
