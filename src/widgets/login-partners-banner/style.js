import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(9, 2),
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
    },
    img_ctn: {
        width: '300px',
        height: '270px',
        position: 'relative',
        alignSelf: 'center',
    },
}));

export default useStyle;
