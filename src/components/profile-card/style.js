import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    '@keyframes clockwise': {
        '0%': {
            top: '-2px',
            left: 0,
        },
        '12%': {
            top: '-1px',
            left: ' 1px',
        },
        '25%': {
            top: 0,
            left: '2px',
        },
        '37%': {
            top: '1px',
            left: '1px',
        },
        '50%': {
            top: '2px',
            left: 0,
        },
        '62%': {
            top: '1px',
            left: '-1px',
        },
        '75%': {
            top: 0,
            left: '-2px',
        },
        '87%': {
            top: '-1px',
            left: '-1px',
        },
        '100%': {
            top: '-2px',
            left: 0,
        },
    },
    '@keyframes counterclockwise': {
        '0%': {
            top: '-2px',
            right: 0,
        },
        '12%': {
            top: '-1px',
            right: '1px',
        },
        '25%': {
            top: 0,
            right: '2px',
        },
        '37%': {
            top: '1px',
            right: '1px',
        },
        '50%': {
            top: '2px',
            right: 0,
        },
        '62%': {
            top: '1px',
            right: '-1px',
        },
        '75%': {
            top: 0,
            right: '-2px',
        },
        '87%': {
            top: '-1px',
            right: '-1px',
        },
        '100%': {
            top: '-2px',
            right: 0,
        },
    },
    root: {
        display: 'flex',
        position: 'relative',
        alignSelf: 'stretch',
        margin: theme.spacing(1, 0),
        flexBasis: (props) => props.sm,
        [theme.breakpoints.down('sm')]:{
            flexBasis: '100% !important',
        },
        transition: '1s box-shadow',
        cursor: 'pointer',
        zIndex: 1,
        boxShadow: 'none',
        '&:hover::after, &:hover::before': {
            display: 'block',
            content: '""',
            position: 'absolute',
            margin: theme.spacing(1, 'auto'),
            borderRadius: '0.65rem',
            height: '100%',
            width: '99%',
            background: '#fe8b19',
            zIndex: 0,
            animationName: '$clockwise',
            animationDuration: '2s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            marginTop: 0,
            marginBottom: 0,
        },

        '&:hover': {
            boxShadow: '0 5px 35px 0px rgb(0 0 0 / 10%)',
        },
        '&:hover::after': {
            background: '#047eaf',
            animation: '4s $counterclockwise infinite',
        },
    },
    container: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: theme.palette.common.white,
        borderRadius: '0.65rem',
        zIndex: 1,
        '&:hover $name,&:hover $sessions': {
            color: theme.palette.secondary.main,
        },
        '&:hover $footer a': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
        },
        '&:hover $img': {
            border: `1px solid ${theme.palette.secondary.main}`,
        },
        '& price_tag': {
            backgroundColor: theme.palette.common.white,
        },
    },
    faved_star: {
        color: '#ffc107',
    },
    img: {
        width: '73px',
        height: '73px',
    },
    rate: {
        fontSize: '1.3rem',
    },
    name: {
        color: theme.palette.primary.main,
    },
    speciality: {
        color: theme.palette.grey[600],
        fontWeight: 300,
        fontSize: '0.9rem',
    },
    price_tag: {
        padding: theme.spacing(0.45, 2),
        backgroundColor: theme.palette.aloPal.dark,
        fontWeight: 500,
        borderRadius: theme.direction.direction === 'rtl' ? '12px 0px 0px 12px' : '0 12px 12px 0',
        color: theme.palette.common.white,
    },
    tag: {
        color: theme.palette.aloPal.blue,
    },
    dollarSign: {
        color: theme.palette.secondary.main,
    },
    footer: {
        // marginTop: theme.spacing(2),
        backgroundColor: theme.palette.thirdinary[600],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1, 1),
        paddingBottom: theme.spacing(),
        fontSize: '18px',
        color: '#fff',
        '& $a': {
            borderRadius: '5px',
            backgroundColor: ' #E0E0E0',
            padding: theme.spacing(1, 1),
            color: theme.palette.aloPal.dark,
            fontWeight: 500,
            fontSize: '1.1rem',
        },
    },
}));

export default useStyle;
