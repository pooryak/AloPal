import { useContext } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import { UserContext } from '../index';

const formats = {
    number: {
        TRY: {
            style: 'currency',
            currency: 'TRY',
        },
        USD: {
            style: 'currency',
            currency: 'USD',
        },
    },
};
function Translation(props) {
    const user = useContext(UserContext);
    const getLocale = (language = user.language) => props.locales.find(
        (item) => item.language === language,
    ) || {};
    const { messages } = getLocale();
    return (
        <IntlProvider
            locale={user.language}
            messages={messages}
            formats={formats}
            defaultFormats={formats}
        >
            {props.children}
        </IntlProvider>

    );
}

Translation.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    locales: PropTypes.array.isRequired,
};

export default Translation;
