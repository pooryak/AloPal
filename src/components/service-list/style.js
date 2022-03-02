import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2, 1),
        [`margin${theme.direction.direction === 'rtl' ? 'Right' : 'Left'}`]: 0,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    divider: {
        display: 'flex',
        width: 'clamp(2%,8.3%,20%)',
        [theme.breakpoints.down('sm')]: {
            width: '1px',
        },
    },
    filter_section: {
        [`margin${theme.direction.direction === 'rtl' ? 'Left' : 'Right'}`]: theme.spacing(4),
    },
    img_ctn: {
        // width: '242px',
        height: '174px',
        position: 'relative',
        alignSelf: 'center',
        marginBottom: theme.spacing(2),
        backgroundColor: theme.palette.common.white,
        borderRadius: '10px',
    },
    root_description: {
        height: '174px',
        [theme.breakpoints.down('sm')]: {
            height: 'unset',
        },
        textOverflow: 'ellipsis',
        marginBottom: theme.spacing(2),
        fontWeight: 300,
        fontSize: theme.typography.pxToRem(24),
        color: theme.palette.aloPal.shades[6],
        lineHeight: '28px',

    },
}));

export default useStyle;
