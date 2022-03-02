import {
    Box, Paper, Button,
    Tabs, Tab, Grid, Typography, TextField,
} from '@material-ui/core';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TabPanel } from 'src/components';
// import Carousel from 'react-material-ui-carousel';
import { CarouselBanner } from 'src/widgets';
import CloseIcon from '@material-ui/icons/Close';
import Image from 'next/image';
import PropTypes from 'prop-types';
import style from './style';

const items = [
    {
        Name: 'Electronics',
        Caption: 'Electrify your friends!',
        contentPosition: 'left',
        Items: [
            {
                Name: 'Macbook Pro',
                Image: 'https://source.unsplash.com/featured/?macbook',
            },
            {
                Name: 'iPhone',
                Image: 'https://source.unsplash.com/featured/?iphone',
            },
        ],
    },
    {
        Name: 'Home Appliances',
        Caption: 'Say no to manual home labour!',
        contentPosition: 'middle',
        Items: [
            {
                Name: 'Washing Machine WX9102',
                Image: 'https://source.unsplash.com/featured/?washingmachine',
            },
            {
                Name: 'Learus Vacuum Cleaner',
                Image: 'https://source.unsplash.com/featured/?vacuum,cleaner',
            },
        ],
    },
    {
        Name: 'Decoratives',
        Caption: 'Give style and color to your living room!',
        contentPosition: 'right',
        Items: [
            {
                Name: 'Living Room Lamp',
                Image: 'https://source.unsplash.com/featured/?lamp',
            },
            {
                Name: 'Floral Vase',
                Image: 'https://source.unsplash.com/featured/?vase',
            },
        ],
    },
];

function ModalContent(props) {
    const classes = style();
    const { handleClose } = props;
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Paper className={classes.root}>
            <Box display="flex" justifyContent="flex-end">
                <CloseIcon onClick={handleClose} />
            </Box>
            <Box display="flex">
                <Grid xs={6}>
                    <Box display="flex" justifyContent="center" alignSelf="stretch">
                        <div className={classes.img_container}>
                            <Image src="/assets/image/skype.svg" height={74} width={165} />
                        </div>
                    </Box>
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Typography>
                            <FormattedMessage id="skypeModal.input" />
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" mt={1} flexDirection="column">
                        <form className={classes.form}>
                            <TextField
                                // inputRef={register({ required: true })}
                                id="outlined-SkypeId"
                                label="Skype ID"
                                type="text"
                                name="skypeId"
                                autoComplete="skypeId"
                                variant="filled"
                                margin="dense"
                                InputProps={{
                                    // startAdornment: <AccountCircle />, // <== adjusted this
                                    disableUnderline: true, // <== added this
                                }}
                            />
                            <Box display="flex" justifyContent="center" mt={2} mb={2}>
                                <Button variant="contained" type="submit" color="secondary">
                                    <FormattedMessage id="skypeModal.setId" />
                                </Button>

                            </Box>
                        </form>
                        <Button variant="string" type="link" className={classes.link}>
                            <FormattedMessage id="skypeModal.tryAgain" />
                        </Button>
                    </Box>
                </Grid>
                <Grid xs={6}>
                    <Box justifyContent="center" fontWeight={700} fontSize={36} textAlign="center">
                        <FormattedMessage id="profile.modal.title" />
                    </Box>
                    <Box marginTop={2} fontWeight={500} textAlign="center">
                        {/* <Carousel
                    className="Example"
                    autoPlay={false}
                    animation="fade"
                    indicators
                    timeout={200}
                    navButtonsAlwaysVisible
                    navButtonsAlwaysInvisible
                >
                    {
                        items.map((item, index) => <CarouselBanner size={100} item={item} key={index} contentPosition={item.contentPosition} />)
                    }
                </Carousel> */}
                    </Box>
                    <Box marginTop={2}>
                        <Tabs value={value} onChange={handleChange} textColor="secondary" indicatorColor="secondary">
                            <Tab label="On Mobile" />
                            <Tab label="On Desktop" />
                        </Tabs>
                        <TabPanel value={value} index={0} white>
                            <div>
                                1- Open the Skype app on your phone or tablet.
                                <br />
                                2- Tap on your profile picture at the top of the screen. If you don't have a profile picture for your
                                account, you should see your initials inside of a gray circle
                                <br />
                                3- This will open a pop-up. Tap on "Skype profile" under the "Manage" section.
                                <br />
                                4- You'll find your Skype Name under the "Profile" section,
                                just above the email used to create the account.`
                            </div>
                        </TabPanel>

                    </Box>
                </Grid>
            </Box>
        </Paper>
    );
}

ModalContent.propTypes = {

};

export default ModalContent;
