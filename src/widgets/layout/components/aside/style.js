import { makeStyles } from '@material-ui/styles';

// const drawerWidth = 240;
const useStyle = makeStyles((theme) => ({
    menu: {
        // width: drawerWidth,
        flexShrink: 0,
        backgroundColor: theme.palette.common.white,
        padding: theme.spacing(2, 0),
        borderRadius: theme.spacing(),
        '& $svg': {
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(),
        },
    },
    fullName: {
        color: theme.palette.primary.main,
        fontSize: '1.3rem',
    },
    avatar: {
        width: 72,
        height: 72,
    },
    menuBox: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
        marginTop: theme.spacing(5.5),
        color: theme.palette.grey[600],
        // backgroundColor: theme.palette.grey[300],
        // border: `solid 1px ${theme.palette.grey[600]}`,
        // borderRadius: theme.spacing(1),
        overflow: 'hidden',
        // transition: theme.transitions.create('backgroundColor'),
        '& $div': {
            padding: theme.spacing(3, 4),
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
        },
        // '& $div:hover': {
        //     backgroundColor: theme.palette.grey[400],
        // },
    },
}));

export default useStyle;
