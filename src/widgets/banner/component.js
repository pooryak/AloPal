import React from 'react';
import {
    Grid, Container, Box, Typography, Button,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import { Avatars } from './components';
import style from './style.js';

function Banner(props) {
    const { title, href } = props;
    const classes = style(props);
    return (
        <Grid container component="article" className={classes.container}>
            <Container max-width="lg" className={classes.root}>
                <Grid item className={classes.header_img} xs={12}>
                    <Image
                        src="/assets/image/Dummy.jpg"
                        alt="Picture of the author"
                        layout="fill"
                        objectFit="cover"
                        // width={700}
                        // height={475}
                    />
                </Grid>
                <Grid container className={classes.header} wrap="wrap">
                    <Grid className={classes.header_titles}>
                        <Box>
                            <Typography variant="subtitle1" fontWeight={500}>
                                <FormattedMessage id="home.certified" />
                            </Typography>
                        </Box>

                        <Typography variant="h3">
                            <FormattedMessage id={title} />
                        </Typography>
                    </Grid>
                    <Grid className={classes.header_btn}>
                        <Link href={href}>
                            <Button variant="outlined">
                                <FormattedMessage id="home.viewPalls" />

                            </Button>
                        </Link>
                    </Grid>
                </Grid>
                <Grid container className={classes.main_avatars} justifyContent="space-around">
                    <Avatars />
                    <Avatars />
                    <Avatars />
                    <Avatars />
                    <Avatars />
                    <Avatars />
                    <Avatars />
                </Grid>
            </Container>
        </Grid>
    );
}

Banner.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Banner;
