import { render } from '@testing-library/react';
import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { UserProvider } from 'src/components/local-provider/component';
import { ProvideAuth } from 'src/utility/contexts/auth';
import locales from 'src/locales';
import { Translation } from 'src/components';
import theme from 'src/styles/theme';

// const { local, direction, localChanger } = useTranslation();
const Providers = ({ children }) => (
    <ThemeProvider theme={theme()}>
        <UserProvider value={{ language: 'en', lock: null }}>
            <Translation locales={locales}>
                {children}
            </Translation>
        </UserProvider>
    </ThemeProvider>
);

const customRender = (ui, options = {}) => render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
