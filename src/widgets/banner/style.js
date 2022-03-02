import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    container: (props) => ({
        backgroundColor: props.white ? '#ffffff' : theme.palette.thirdinary[300],
        minHeight: '110vh',
        padding: theme.spacing(9, 0),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(4, 0),
        },
    }),
    header: {
        display: 'flex',
        flexBasis: 'unset',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    header_btn: {
        display: 'flex',
        alignItems: 'flex-end',
    },
    header_titles: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        flexBasis: 'unset',
        [theme.breakpoints.down('sm')]: {
            flexBasis: '45%',
        },
        // '& $h3': {
        //     [theme.breakpoints.down('sm')]: {
        //         fontSize: '1.5rem',
        //     },
        // },
    },
    header_img: {
        height: '175px',
        [theme.breakpoints.down('sm')]: {
            height: '60px',
            flexBasis: 'unset',
        },
        position: 'relative',
    },
    main_avatars: {
        display: 'flex',
        justifySelf: 'baseline',
        marginTop: theme.spacing(5),
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            // flexDirection: 'column',
            flexWrap: 'wrap',
        },
    },
}));

export default useStyle;
