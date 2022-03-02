import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: (props) => ({
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'stretch',
        margin: theme.spacing(1),
        flexBasis: props.sm,
        [theme.breakpoints.down('sm')]: {
            flexBasis: props.xs,
        },
        cursor: 'pointer',
    }),
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: theme.palette.common.white,
        transition: theme.transitions.create(['background', 'box-shadow', 'color'], {
            duration: theme.transitions.duration.complex,
        }),
        '&:hover': {
            boxShadow: '0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)',
        },
        '&:hover $name,&:hover $sessions': {
            color: theme.palette.secondary.main,
        },
        '&:hover $footer a': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
        },
        borderRadius: '0.65rem',
        '&:hover $img': {
            border: `1px solid ${theme.palette.secondary.main}`,
        },
    },
    sessions: {
        position: 'absolute',
        right: 0,
        padding: theme.spacing(1, 2),
        // backgroundColor: theme.palette.grey[400],
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        fontWeight: 700,
        textAlign: 'center',
        color: theme.palette.primary.main,
    },
    faved_star: {
        color: '#ffc107',
    },
    img_wrap: {
        // border: `1px solid ${theme.palette.secondary.main}`,
    },
    img: {
        width: '73px',
        height: '73px',
        // '& :hover': {
        //     border: `1px solid ${theme.palette.secondary.main}`,
        // },
    },
    price_tag: {
        padding: theme.spacing(1, 2),
        backgroundColor: theme.palette.thirdinary[300],
        fontWeight: 500,
        borderRadius: '0 12px 12px 0',
    },
    name: {
        color: theme.palette.primary.main,
    },
    footer: {
        marginTop: theme.spacing(1),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1, 1),
        fontSize: '18px',
        color: '#fff',
        '& $a': {
            borderRadius: '5px',
            backgroundColor: '#E0E0E0',
            padding: theme.spacing(1, 1),
            color: theme.palette.aloPal.dark,
            fontWeight: 500,
            fontSize: '1.1rem',
        },
    },
}));

export default useStyle;
