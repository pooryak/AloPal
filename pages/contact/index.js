import {
    Box, Grid, Typography,
    TextField, MenuItem, Button,
    InputAdornment,
} from '@material-ui/core';
import { useState } from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import { Container, PageTitle, Notification } from 'src/components';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import CheckIcon from '@material-ui/icons/Check';
import { emailRegex } from 'src/utility/regex';
import { FormattedMessage } from 'react-intl';
import { ErrorMessage } from '@hookform/error-message';
import { useMutation } from 'react-query';
import { ApiContactusPostRepository } from 'repository';
import { useForm, Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Image from 'next/image';
import constants from 'constants.js';
import Link from 'next/link';
import decoder from 'compiled';

console.log('🚀 ~ file: index.js ~ line 14 ~ decoder', decoder);

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
    },
    image: {
        paddingTop: 'calc((307/572)*100%)',
        // height: '307px',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
    },
    subTitle: {
        fontWeight: 600,
    },
    description: {
        fontSize: '1.15rem',
        fontFamily: 'Roboto',
        '& $a': {
            fontSize: '1.15rem',
            textDecoration: 'underline',
        },
    },
    form: {
        padding: theme.spacing(6, 4),
        backgroundColor: theme.palette.common.white,
        borderRadius: 10,
        '& .MuiTextField-root , & .MuiFilledInput-root': {
            backgroundColor: theme.palette.grey[100],
            borderRadius: 10,
        },
        display: 'flex',
        '& .MuiTextField-root::focus , & .MuiFilledInput-root::focus': {
            backgroundColor: theme.palette.primary.main,
        },
        flexDirection: 'column',
        justifyContent: 'center',
        '& .MuiFormLabel-asterisk, $svg': {
            color: theme.palette.secondary.main,
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: theme.palette.secondary.main,
        },
        '& .MuiFilledInput-root $input , .MuiFilledInput-root $textarea , .MuiFilledInput-root $select ': {
            color: `${theme.palette.aloPal.dark} !important`,
        },
        border: 'none',
    },
    field: {
        margin: theme.spacing(2, 0),
        width: '100%',
    },
    mt_auto: {
        marginTop: 'auto',
    },
    btn: {
        padding: theme.spacing(1.1, 6),
        borderRadius: theme.spacing(7),
        color: theme.palette.common.white,
        width: '60%',
        margin: theme.spacing(1, 'auto'),
    },
    whatsapp: {
        '&:hover a:before': {
            backgroundColor: '#25D366',
        },
    },
    facebook: {
        '&:hover a:before': {
            backgroundColor: '#4267B2',
        },
    },
    telegram: {
        '&:hover a:before': {
            backgroundColor: '#0088cc',
        },
    },
    instagram: {
        '&:hover a:before': {
            backgroundColor: '#C13584',
        },
    },
    twitter: {
        '&:hover a:before': {
            backgroundColor: '#1DA1F2',
        },
    },
    linkedin: {
        '&:hover a:before': {
            backgroundColor: '#2867B2',
        },
    },
    socials: {
        '& $ul': {
            display: 'flex',
            margin: 0,
            padding: 0,
        },
        '& $li': {
            listStyle: 'none',
            padding: theme.spacing(0, 1),
        },
        '& $svg': {
            fontSize: '19px',
            position: 'relative',
            zIndex: 4,
            transition: '0.5s',
            display: 'inline-block',
            color: theme.palette.common.white,
        },
        '& $a': {
            backgroundColor: theme.palette.aloPal.dark,
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            textAlign: 'center',
            lineHeight: '80px',
            overflow: 'hidden',
            transition: '.5s',
            zIndex: 2,
            border: `3px solid ${theme.palette.aloPal.dark}`,
        },
        '& $a:hover:before': {
            top: 0,
        },
        '& $a:hover $svg': {
            transform: 'rotateY(360deg)',
            color: theme.palette.common.white,
        },
        '& $a::before': {
            content: '""',
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#11a683',
            transition: '.5s',
            zIndex: 3,
        },
    },
    tick: {
        color: `${theme.palette.success.main} !important`,
    },
}));

function ContactUs(props) {
    const classes = useStyles();
    const {
        register, handleSubmit, formState: { errors }, control, setError,
    } = useForm();
    const [notification, setNotification] = useState({
        snackState: false,
        message: '',
        severity: '',
    });
    const departments = Object.entries(decoder.alopal.backend.ContactCategory);
    const socialAddress = constants.social_addresses;
    const [emailError, setEmail] = useState(true);
    const changeValue = (e) => {
        const { value } = e.target;
        const result = emailRegex(value);
        if (!result) {
            return setEmail((prevState) => true);
        }
        return setEmail((prevState) => false);
    };
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
    const postData = useMutation((data) => ApiContactusPostRepository.apiContactusPostPost(data), {
        onSuccess: (apiData) => {
            const decodedData = decoder.alopal.backend.ContactMessageResponse.decode(apiData.data);
            console.log('🚀 ~ file: index.js ~ line 115 ~ registerMutation ~ decodedData', decodedData);
            setNotification({
                snackState: true,
                message: <FormattedMessage id="successfull_operation" />,
                severity: 'success',
            });
            // setCurrentUser(decodedData.messages);
        },
        onError: (error) => {
            const errResponse = decoder.alopal.backend.BareResponse.decode(error?.response?.data);
            // setError('username', {
            //     type: 'manual',
            //     message: 'Dont Forget Your Username Should Be Cool!',
            // });
            console.error('🚀 ~ file: component.js ~ line 59 ~ onSubmit ~ errResponse', errResponse);
        },
    });

    const sendData = async (data) => {
        // Todo: backend: it doesn't need context (public)
        const dataWithContext = {
            requestContext: {
                bearer: {
                    token: 'tokenStatus.token.token',
                },
            },
            contactMessage: {
                message: data.message,
                category: data.category,
                emailAddress: data.email,
                title: data.name,
            },
        };
        const verify = decoder.alopal.backend.ContactMessageRequest.create(dataWithContext);
        const encodedData = decoder.alopal.backend.ContactMessageRequest.encode(verify).finish();
        await postData.mutateAsync(encodedData);
    };
    const submitForm = (data) => {
        sendData(data);
    };
    return (
        <Container>
            <Notification snackState={notification.snackState} duration={6000} message={notification.message} severity={notification.severity} />
            <PageTitle>
                <FormattedMessage id="page.contact.title" />
            </PageTitle>
            <Grid container className={classes.root}>
                <Grid xs={12} sm={6} display="flex" flexDirection="column" padding={1}>
                    <div className={classes.image}>

                        <Image src="/assets/image/leaf.jpg" alt="banner" layout="fill" />
                    </div>
                    <Box display="flex" flexDirection="column" mt={2} className={classes.mt_auto}>
                        <Box mb={1}>
                            <Typography fontWeight={700} fontSize={24} color="aloPal.dark">
                                <FormattedMessage id="contactus.connect" />
                            </Typography>
                        </Box>
                        <div className={classes.description}>
                            <Typography fontWeight={300} fontSize={18} component="span">
                                <FormattedMessage id="footer.reach_us" />
                            </Typography>
                            <a href="mailto:hello@alopal.net">
                                {' '}
                                hello@alopal.net
                                {' '}
                            </a>
                            <Typography fontWeight={300} fontSize={18} component="span">
                                <FormattedMessage id="footer.reach_us_through" />
                            </Typography>
                            <Link href="/contact">
                                <a>
                                    <FormattedMessage id="form.online_contact" />
                                </a>
                            </Link>
                        </div>
                        <Box display="flex" mt={2} className={classes.socials}>
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
                    </Box>
                </Grid>
                <Grid sm={1} />
                <Grid xs={12} sm={5} padding={1}>
                    <form className={classes.form} onSubmit={handleSubmit(submitForm)}>
                        <TextField
                            inputRef={register({ required: true })}
                            className={classes.field}
                            id="outlined-Name"
                            label={<FormattedMessage id="name" />}
                            type="text"
                            name="name"
                            autoComplete="name"
                            variant="filled"
                            margin="dense"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            fullWidth
                            required
                            // InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            className={classes.field}
                            inputRef={register({
                                required: true,
                                pattern: {
                                    // eslint-disable-next-line no-useless-escape
                                    value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                    message: <FormattedMessage id="errors.email_pattern" />,
                                },
                            })}
                            id="outlined-Email"
                            label={<FormattedMessage id="Email" />}
                            type="text"
                            name="email"
                            autoComplete="email"
                            variant="filled"
                            margin="dense"
                            InputProps={{
                                disableUnderline: true,
                                endAdornment: !emailError && (<InputAdornment position="end"><CheckIcon className={classes.tick} /></InputAdornment>),
                            }}
                            fullWidth
                            required
                            onChange={(e) => changeValue(e, 'email')}
                            // InputLabelProps={{ shrink: true }}
                        />
                        <ErrorMessage errors={errors} name="email" as={<p className="error" />} />
                        <Controller
                            control={control}
                            name="category"
                            as={(
                                <TextField
                                    id="standard-select-currency-native"
                                    inputRef={register({ required: true })}
                                    className={classes.field}
                                    select
                                    label={<FormattedMessage id="form.department" />}
                                    name="department"
                                    // InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    required
                                    variant="filled"
                                    margin="dense"
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                >
                                    {
                                        departments.map((item, index) => (
                                            <MenuItem key={`${item - index}`} value={item[1]}>
                                                {item[0]}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                            )}
                        />

                        <TextField
                            className={classes.field}
                            inputRef={register({ required: true })}
                            id="outlined-message"
                            label={<FormattedMessage id="Message" />}
                            type="text"
                            name="message"
                            autoComplete="message"
                            variant="filled"
                            margin="dense"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            fullWidth
                            required
                            rows={4}
                            multiline
                            // InputLabelProps={{ shrink: true }}
                        />
                        <Button className={classes.btn} variant="contained" color="secondary" type="submit" fullWidth>
                            <FormattedMessage id="form.sendMessage" />
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
}

ContactUs.propTypes = {

};

export default ContactUs;
