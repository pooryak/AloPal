import React from 'react';
import {
    Grid, Container, Typography, Card,
    CardActionArea, CardMedia, CardContent, CardActions, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import style from './style.js';

function ServiceCard(props) {
    const classes = style();
    const { imgurl } = props;
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={imgurl.src}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" align="center">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" align="center">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.button_container}>
                <Button size="small" fullWidth className={classes.button}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

ServiceCard.propTypes = {
    imgurl: PropTypes.object.isRequired,
};

export default ServiceCard;
