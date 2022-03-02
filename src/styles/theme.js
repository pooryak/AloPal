
import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
// import '@culturehq/add-to-calendar/dist/styles.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import PropTypes from 'prop-types';

function Theme(props) {
    console.log('🚀 ~ file: theme.js ~ line 10 ~ Theme ~ props', props);
    let theme = createTheme({
        direction: props || 'ltr',
        typography: {
            fontFamily: `${props?.direction === 'rtl' ? 'BRoya' : 'KoHo'},'Roboto', "Helvetica", "Arial", sans-serif`,
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
        },
        palette: {
            mode: `${props?.mode === 'dark' ? 'dark' : 'light'}`,
            primary: {
                main: '#074c68',
            },
            secondary: { main: '#fe8b19' },
            thirdinary: { main: '#eef2e3' },
            errorf: '#bf1650',
            white: '#fff',
            success: {
                main: '#05CE91',
            },
            boxBorderRadius: '32px',
            aloPal: {
                blue: '#047EAF',
                dark: '#074C69',
                shades: {
                    1: '#EDEDED',
                    2: '#E2E1E1',
                    3: '#B9B7B7',
                    4: '#9F9F9F',
                    5: '#828181',
                    6: '#666666',
                    7: '#4A4A4A',
                },
            },

        },
    });
    theme = responsiveFontSizes(theme);
    return theme;
}

Theme.propTypes = {

};

export default Theme;
