import React from 'react';
import {
    Grid, Container, Typography, Card,
    CardActionArea, CardMedia, CardContent, CardActions, Button,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import style from './style.js';

function Cards(props) {
    const classes = style();
    const { title, imgurl, description } = props;
    return (
        <Card className={classes.root}>
            <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={imgurl}
                title="Contemplative Reptile"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2" align="left">
                    <FormattedMessage id={title} />
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" align="left">
                    <FormattedMessage id={description} />
                </Typography>
            </CardContent>
        </Card>
    );
}

Cards.propTypes = {

};

export default Cards;
