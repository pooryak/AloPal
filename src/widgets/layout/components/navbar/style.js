import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles((theme) => {
    console.log(theme, 'theme');
    return ({
        root: {
            backgroundColor: theme.palette.aloPal.dark,
            fontWeight: 500,
        },
        toolbarFlex: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: 0,
        },
        separator: {
            display: 'flex',
            flex: 1,
        },
    });
});

export default useStyle;
