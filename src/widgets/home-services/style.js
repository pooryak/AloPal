import { makeStyles } from '@material-ui/styles';
import dummy from 'public/assets/image/leaf.jpg';

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        position: 'relative',
        zIndex: 1,
        backgroundImage: `url(${dummy.src})`,
        minHeight: '80vh',
        padding: '50px 0',
        backgroundPositionX: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        [theme.breakpoints.down('sm')]: {
            backgroundImage: 'unset',
        },
        '&:before': {
            zIndex: -1,
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'block',
            left: 0,
            top: 0,
            opacity: 0.3,
            content: ' " " ',
            background: theme.palette.white,
        },

    },

    txt_container: {
        justifySelf: 'flex-start',
        flexDirection: 'column',
    },
    service_title: {
        fontWeight: 'bold',
        marginLeft: '10px',
    },
    h1: {
        // fontSize: '36px',
        fontWeight: 'bold',
    },
    h3: {
        // fontSize: '18px',
        marginBottom: '30px',
    },
    services: {
        marginTop: '20px',
    },
    service_container: {
        display: 'flex',
        alignContent: 'center',
        '& $img': {
            width: '35px',
        },
    },
}));

export default useStyle;
