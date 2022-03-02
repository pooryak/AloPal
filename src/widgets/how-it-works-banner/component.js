import React from 'react';
import {
    Grid, Container, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { FormattedMessage } from 'react-intl';
import dummy from 'public/assets/image/download.png';
import tmpImg from 'public/assets/image/avatar4.55833b54.svg';
import { Cards } from './components';
import style from './style.js';

function Howitworks(props) {
    const classes = style();
    return (
        <Grid container component="article" className={classes.container}>
            <Container max-width="lg" className={classes.root}>
                <Grid item  className={classes.txt_container}>
                    <Typography variant="h2" component="h2" className={classes.h2}>
                        <FormattedMessage id="main.how_it_works" />
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent="space-around" alignSelf="flex-end" marginTop={2} className={classes.services}>
                        <Cards
                            title="home.title.find"
                            imgurl={dummy.src}
                            description="home.find.description"
                            className={classes.card}
                        />
                        <Cards
                            title="home.title.book"
                            imgurl={dummy.src}
                            description="home.book.description"
                            className={classes.card}
                        />
                        <Cards
                            title="home.title.guarantee"
                            imgurl={dummy.src}
                            description="home.guarantee.description"
                            className={classes.card}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    );
}

Howitworks.propTypes = {

};

export default Howitworks;
