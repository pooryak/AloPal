import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => {
    console.log('🚀 ~ file: style.js ~ line 4 ~ useStyles ~ theme', theme);
    return ({
        container: {
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            borderRadius: theme.shape.borderRadius,
            padding: theme.spacing(1, 2),
            flexDirection: 'column',
        },
        timeSlots_container: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: theme.spacing(1, 2),
        },
        chips_container: {
            display: 'flex',
            marginTop: theme.spacing(1),
            justifyContent: 'space-between',
            flexWrap: 'wrap',
        },
        chips: {
            padding: theme.spacing(1, 2),
            backgroundColor: theme.palette.grey['200'],
            borderRadius: theme.spacing(2),
            border: `1px solid ${theme.palette.grey.A700}`,
            cursor: 'pointer',
            marginBottom: theme.spacing(1),
        },
        selected: {
            boxShadow: theme.shadows[5],
            transition: theme.transitions.create(['background', 'box-shadow'], {
                duration: theme.transitions.duration.complex,
            }),
        },
        highlight: {
            borderRadius: '50%',
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
            '&:hover, &:focus': {
                backgroundColor: theme.palette.secondary.dark,
            },
        },
    });
});

export default useStyles;
