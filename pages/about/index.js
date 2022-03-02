import { FormattedMessage } from 'react-intl';
import {
    Typography, Grid, Box, Button,
} from '@material-ui/core';
import Image from 'next/image';
import { Container, PageTitle, TestimonialsBanner } from 'src/components';
// import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const items = [
    {
        name: 'Jhon Doe',
        image: './',
        caption: 'took part in medical services',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Pellentesque auctor placerat suscipit. Etiam efficitur, dolor porttitor 
        sollicitudin sodales, nulla enim tincidunt odio, in ultrices nisi mi sagittis orci.`,
    },
    {
        name: 'Jhon Doee',
        image: './',
        caption: 'took part in medical services',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Pellentesque auctor placerat suscipit. Etiam efficitur, dolor porttitor 
        sollicitudin sodales, nulla enim tincidunt odio, in ultrices nisi mi sagittis orci.`,
    },
    {
        name: 'Jhon Doeee',
        image: './',
        caption: 'took part in medical services',
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Pellentesque auctor placerat suscipit. Etiam efficitur, dolor porttitor 
        sollicitudin sodales, nulla enim tincidunt odio, in ultrices nisi mi sagittis orci.`,
    },
];

const useStyle = makeStyles((theme) => ({
    container: {
        paddingTop: 0,
        paddingBottom: theme.spacing(4),
    },
    root: {
        // marginTop: theme.spacing(4),
    },
    image: {
        paddingTop: 'calc((558/376)*100%)',
        // height: '307px',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
    },
    blog_img: {
        // paddingTop: 'calc((358/1440)*100%)',
        height: '307px',
        position: 'relative',
        opacity: '0.2',
        // borderRadius: theme.shape.borderRadius,
        // overflow: 'hidden',
    },
    blog: {
        position: 'relative',
        margin: theme.spacing(3, 0),
    },
    blog__btn: {
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translate(-50%,-20%)',
        fontWeight: 600,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        '& $button': {
            marginTop: theme.spacing(2),
            padding: theme.spacing(1.8, 4),
        },
    },
}));

function AboutUs(props) {
    const classes = useStyle();
    return (
        <>
            <Container>
                <PageTitle>
                    <Typography variant="h3" component="h1">
                        <FormattedMessage
                            id="page.about"
                            values={{
                                linebreak: <br />,
                            }}
                        />
                    </Typography>
                </PageTitle>
            </Container>

            <Container className={classes.container}>
                <Grid container spacing={3} className={classes.root}>
                    <Grid item sm={4}>
                        <div className={classes.image}>
                            <Image src="/assets/image/leaf.jpg" alt="banner" layout="fill" />
                        </div>
                    </Grid>
                    <Grid item sm={8}>
                        <Typography variant="body1">

                            <FormattedMessage
                                id="page.about.description1"
                            />
                        </Typography>
                        <Typography variant="body1">
                            <FormattedMessage
                                id="page.about.description2"
                            />

                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Grid item sm={12} className={classes.blog}>
                <div className={classes.blog_img}>
                    <Image src="/assets/image/leaf.jpg" alt="banner" layout="fill" />
                </div>
                <Box className={classes.blog__btn}>

                    <Typography>
                        <FormattedMessage
                            id="page.about.blog_description"
                        />
                    </Typography>
                    <Button variant="contained" color="secondary">
                        <FormattedMessage
                            id="page.about.blog_btn"
                        />
                    </Button>
                </Box>
            </Grid>
            <Grid xs={12}>
                <Container>
                    <Box textAlign="center" mb={2}>
                        <Typography variant="h4" component="h2">
                            <FormattedMessage id="page.about.testimonial.title" />
                        </Typography>
                    </Box>
                    {/* <Carousel
                        className="Example"
                        autoPlay={false}
                        animation="fade"
                        timeout={200}
                        navButtonsAlwaysVisible
                    >
                        {
                            Array(3).fill().map((index) => <TestimonialsBanner size={400} data={items} key={index} />)
                        }
                    </Carousel> */}
                </Container>
            </Grid>

        </>
    );
}

AboutUs.propTypes = {

};

export default AboutUs;
