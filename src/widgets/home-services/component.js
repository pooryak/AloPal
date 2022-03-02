import React from 'react';
import {
    Grid, Container, Typography, Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Image from 'next/image';
import dummy from 'public/assets/image/download.png';
import tmpImg from 'public/assets/image/avatar4.55833b54.svg';
import { ServiceCard } from './components';
import style from './style.js';

// console.log('🚀 ~ file: component.js ~ line 9 ~ tmpImg', tmpImg);

function HomeServices(props) {
    const classes = style();
    return (
        <Grid container component="article" className={classes.container}>
            <Container max-width="lg" className={classes.root}>
                <Grid xs={12} sm={6} item className={classes.txt_container}>
                    <Typography variant="h2" className={classes.h1}>
                        Lorem Ipsum DOLOR SIT
                    </Typography>
                    <Typography variant="h5" className={classes.h3}>
                        Lorem Ipsum DOLOR SIT
                    </Typography>
                </Grid>
                <Grid xs={12} item>
                    <Box className={classes.service_container}>
                        {/* <img src={tmpImg} className={classes.img} /> */}
                        <Image
                            src="/assets/image/avatar4.55833b54.svg"
                            alt="Picture of the author"
                            width={50}
                            height={50}
                        />
                        <Typography component="p" className={classes.service_title}>
                            Services
                        </Typography>
                    </Box>
                    <Grid container justifyContent="space-around" className={classes.services}>
                        <ServiceCard imgurl={dummy} />
                        <ServiceCard imgurl={dummy} />
                        <ServiceCard imgurl={dummy} />
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    );
}

HomeServices.propTypes = {

};

export default HomeServices;
