import { Container } from 'src/components';
import { Player } from '@lottiefiles/react-lottie-player';
import PropTypes from 'prop-types';
import vid from '../public/assets/animations/404.json';

function FourOhFour() {
    return (
        <Container>
            <Player
                autoplay
                loop
                src={vid}
                style={{ height: '300px', width: '300px' }}
            />
        </Container>
    );
}

FourOhFour.propTypes = {

};

export default FourOhFour;
