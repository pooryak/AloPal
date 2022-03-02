import { Grid, Avatar, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import style from './style';

function Testimonials(props) {
    const classes = style();
    const { data } = props;
    return (
        <Grid className={classes.container}>
            {
                data.map((item) => (
                    <Grid key={item.name} className={classes.root}>
                        <Avatar sizes="60px" />
                        <Typography variant="subtitle2">
                            {item.name}
                        </Typography>
                        <Typography variant="caption">
                            {item.caption}
                        </Typography>
                        <Typography>
                            {item.content}
                        </Typography>
                    </Grid>
                ))
            }

        </Grid>
    );
}

Testimonials.propTypes = {

};

export default Testimonials;
