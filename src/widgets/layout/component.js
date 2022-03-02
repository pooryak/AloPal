import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Container } from 'src/components';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useToken } from 'src/utility/hooks';
import { NavBar, Footer, Aside } from './components';

function Layout(props) {
    const { direction } = props.data;
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const router = useRouter();
    const tokenStatus = useToken();
    const userRoute = router.pathname.startsWith('/dashboards');
    return (
        <div style={{ direction, backgroundColor: theme.palette.aloPal.shades[1] }}>
            <NavBar />
            {tokenStatus.token?.is_login && userRoute && matches ? (
                <Container style={{ display: 'flex' }}>
                    <div style={{ width: '295px' }}>
                        <Aside path={router.pathname} userType={tokenStatus.token.userType} />
                    </div>
                    {props.children}
                </Container>
            ) : props.children}
            <Footer />
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.object.isRequired,
    direction: PropTypes.string,
    data: PropTypes.object.isRequired,
};

Layout.defaultProps = {
    direction: 'ltr',
};

export default Layout;
