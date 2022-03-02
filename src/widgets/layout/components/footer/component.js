import { useContext } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { date } from 'src/utility';
import { UserContext } from 'src/components';
import { FormattedMessage } from 'react-intl';
import constants from 'constants.js';
import Typography from '@material-ui/core/Typography';
import Image from 'next/image';
import Box from '@material-ui/core/Box';
import Link from 'next/link';
import style from './style';

const footerItems = [{
    text: 'footer.Sessions',
    to: '/sessions',
    id: 'Sessions-1',
}, {
    text: 'footer.about',
    to: '/about',
    id: 'about-1',
}, {
    text: 'footer.doctor_list',
    to: '/list/doctors',
    id: 'doctor_list-1',
}, {
    text: 'footer.tutor_list',
    to: '/list/tutor',
    id: 'tutor_list-1',
}, {
    text: 'footer.faq',
    to: '/faq',
    id: 'faq-1',
}, {
    text: 'footer.for_doctors',
    to: '/work-with-us',
    id: 'for_doctors-1',
}, {
    text: 'footer.temrs',
    to: '/terms',
    id: 'temrs-1',
}, {
    text: 'footer.contact',
    to: '/contact',
    id: 'contact-1',
}];

function Footer(props) {
    const classes = style();
    const user = useContext(UserContext);
    const currentYear = date.getYear(user.language);
    const socialAddress = constants.social_addresses;
    function socialIcon(title) {
        switch (true) {
            case title === 'whatsapp':
                return <WhatsAppIcon className={classes.icon} />;
            case title === 'facebook':
                return <FacebookIcon className={classes.icon} />;
            case title === 'telegram':
                return <TelegramIcon className={classes.icon} />;
            case title === 'instagram':
                return <InstagramIcon className={classes.icon} />;
            case title === 'twitter':
                return <TwitterIcon className={classes.icon} />;
            case title === 'linkedin':
                return <LinkedInIcon className={classes.icon} />;
            default:
                return 'wrongAddress';
        }
    }
    return (
        <footer className={classes.footer}>
            <Container max-width="lg">
                <Grid container>
                    <Grid xs={12} sm={6} className={classes.navContainer}>
                        <Grid item className={classes.ul_list}>
                            <ul className={classes.listContainer}>
                                {
                                    footerItems.map((item) => (
                                        <Link href={item.to} key={item.text}>
                                            <Typography component="li" variant="subtitle1" key={item.id}>
                                                <FormattedMessage id={item.text} />
                                            </Typography>
                                        </Link>
                                    ))
                                }
                            </ul>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={6} className={classes.socialContainer}>
                        <Grid item direction="column" className={classes.wrapper}>
                            <Typography
                                component="span"
                                variant="h4"
                                className={classes.footer_title}
                            >
                                <FormattedMessage id="footer.contact_us" />
                            </Typography>
                            <div className={classes.description}>
                                <Typography component="span">
                                    <FormattedMessage id="footer.reach_us" />
                                    {' '}
                                </Typography>
                                <a href="mailto:hello@alopal.net">
                                    hello@alopal.net
                                </a>
                                <Typography component="span">
                                    {' '}
                                    <FormattedMessage id="footer.reach_us_through" />
                                </Typography>
                                {' '}
                                <Link href="/contact">
                                    <a>
                                        online contact form
                                    </a>
                                </Link>
                                {' '}
                            </div>
                            <Box display="flex" marginTop={2} className={classes.socials}>
                                <ul>
                                    {
                                        socialAddress.map((item) => (
                                            <li key={item.title} className={classes[item.title]}>
                                                <a href={item.address}>
                                                    {socialIcon(item.title)}
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Box>
                            {/* <p>
                                © Copyright
                                {' '}
                                {currentYear}
                                {' '}
                                AloPal. All rights reserved.
                            </p> */}
                        </Grid>

                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}

Footer.propTypes = {

};

export default Footer;
