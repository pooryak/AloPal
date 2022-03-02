import {
    Grid, Box, Avatar, Button, Rating,
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import style from './style';

function ProfileCard(props) {
    const { xs, sm, data } = props;
    const classes = style({ xs, sm });
    const router = useRouter();
    const {
        star, pic, name, family, price, duration, id, speciality, serviceProfileId,
    } = data;
    return (
        <Link href={`/services/psychotherapy/${id}`}>
            <Grid className={classes.root}>
                <div className={classes.container}>
                    <Box padding={1}>
                        <Box display="flex" justifyContent="flex-end">
                            <Rating
                                name="simple-controlled"
                                value={star}
                                readOnly
                                className={classes.rate}
                            />
                        </Box>
                        <Box
                            display="flex"
                            alignSelf="stretch"
                            justifyContent="center"
                            marginTop={6}
                            marginBottom={1}
                        >
                            <Avatar className={classes.img} src={pic} />
                        </Box>
                        <Box marginTop={3} fontWeight={700} fontSize={20} textAlign="center" className={classes.name}>
                            {`${name} ${family}`}
                        </Box>
                        <Box textAlign="center" fontFamily="Roboto" marginTop={0.5} className={classes.speciality}>
                            {speciality}
                        </Box>
                    </Box>
                    <Box
                        marginTop={5.5}
                        padding={1}
                        display="flex"
                        alignSelf="stretch"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box className={classes.price_tag}>
                            <span className={classes.dollarSign}>$</span>
                            {' '}
                            {price}
                        </Box>
                        <Box className={classes.tag}>
                            {duration}
                        </Box>
                    </Box>
                    <footer className={classes.footer}>
                        <Button href={`/services/${router.query.service}/${id}/${serviceProfileId}`} fullWidth>
                            <FormattedMessage id="profileCard.visit_profile" />
                        </Button>
                    </footer>
                </div>
            </Grid>
        </Link>
    );
}

ProfileCard.propTypes = {
    data: PropTypes.object.isRequired,
    xs: PropTypes.string.isRequired,
    sm: PropTypes.string.isRequired,
};

export default ProfileCard;
