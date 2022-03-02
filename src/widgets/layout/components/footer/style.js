import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#D9D9D9',
        width: '100%',
        // height: '100px',
        borderTop: '1px solid #eaeaea',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px 0',
    },
    listContainer: {
        // columns: 2,
        height: '100%',
        listStyle: 'none',
        display: 'flex',
        cursor: 'pointer',
        flexWrap: 'wrap',
        '& $li:hover': {
            fontWeight: 700,
            color: theme.palette.primary.main,
        },
        margin: 0,
        '& $li': {
            position: 'relative',
            flex: '1 1 50%',
            // margin: theme.spacing(1.1 , 0),
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: '20px',
        },
        '& $li::before': {
            content: '""',
            position: 'absolute',
            bottom: '7px',
            [theme.direction.direction === 'rtl' ? 'right' : 'left']: '-23px',
            width: '16px',
            height: '16px',
            display: 'block',
            background: theme.palette.secondary.main,
            borderRadius: '5px',
        },
    },
    ul_list: {
        height: '100%',
    },
    socialContainer: {
        padding: '3px 10px',
    },
    wrapper: {
        [`border${theme.direction.direction === 'rtl' ? 'Right' : 'Left'}`]: `1px solid ${theme.palette.secondary.main}`,
        [theme.breakpoints.down('sm')]: {
            [`border${theme.direction.direction === 'rtl' ? 'Right' : 'Left'}`]: 'unset',
        },
        [`padding${theme.direction.direction === 'rtl' ? 'Right' : 'Left'}`]: theme.spacing(),
    },
    footer_title: {
        color: theme.palette.primary.dark,
        fontWeight: 500,
        fontSize: theme.typography.pxToRem(36),
    },
    description: {
        // display: 'flex',
        fontFamily: 'Roboto',
        flexWrap: 'wrap',
        fontSize: '1.15rem',
        '& $a': {
            fontSize: '1.15rem',
            textDecoration: 'underline',
        },
    },
    socials_icons: {
        [`margin${theme.direction.direction === 'rtl' ? 'Left' : 'Right'}`]: theme.spacing(2),
        '& $img': {
            cursor: 'pointer',
        },
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
        // '& $li:nth-child(2) a:before': {
        //     backgroundColor: '#3b5999',
        // },
        // '& $li:nth-child(3) a:before': {
        //     backgroundColor: '#E1306C',
        // },
    },
}));

export default useStyle;
