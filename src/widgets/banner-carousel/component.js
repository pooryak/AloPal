import {
    Grid, Typography, Box, Button, CardContent, CardMedia, Card,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
// import Carousel from 'react-material-ui-carousel';
import PropTypes from 'prop-types';
import style from './style';



function Banner(props) {
    const classes = style(props);
    const contentPosition = props.contentPosition ? props.contentPosition : 'left';
    const totalItems = props.length ? props.length : 3;
    const mediaLength = totalItems - 1;

    const items = [];
    const content = (
        <Grid item xs={12 / totalItems} key="content">
            <CardContent className={classes.Content}>
                <Typography className={classes.Title}>
                    {props.item.Name}
                </Typography>

                <Typography className={classes.Caption}>
                    {props.item.Caption}
                </Typography>

                <Button variant="outlined" className={classes.ViewButton}>
                    View Now
                </Button>
            </CardContent>
        </Grid>
    );

    for (let i = 0; i < mediaLength; i++) {
        const item = props.item.Items[i];

        const media = (
            <Grid item xs={12 / totalItems} key={item.Name}>
                <CardMedia
                    className={classes.Media}
                    image={item.Image}
                    title={item.Name}
                >
                    <Typography className={classes.MediaCaption}>
                        {item.Name}
                    </Typography>
                </CardMedia>

            </Grid>
        );

        items.push(media);
    }

    if (contentPosition === 'left') {
        items.unshift(content);
    } else if (contentPosition === 'right') {
        items.push(content);
    } else if (contentPosition === 'middle') {
        items.splice(items.length / 2, 0, content);
    }

    return (
        <Card raised className={classes.Banner}>
            <Grid container spacing={0} className={classes.BannerGrid}>
                {items}
            </Grid>
        </Card>
    );
}

export default Banner;
