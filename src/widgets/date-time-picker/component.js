import { useState } from 'react';
import { Render } from 'src/components';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { TextField, IconButton, Grid } from '@material-ui/core';
import AdapterDateFns from '@material-ui/lab/AdapterDayjs';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import JalaliUtils from '@date-io/jalaali';
import PickersDay from '@material-ui/lab/PickersDay';
import { getDayDate, getDayDateFa, getHourMinutes } from 'src/utility/date';
import dayjs from 'dayjs';
import clsx from 'clsx';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import style from './style';

function DateTimePicker(props) {
    const {
        userSetting, reservedTimes,
        handleDateChange,
        selectedDate, setSelectedSlot,
        onMonthChange,
        visibleHours,
    } = props;
    console.log('🚀 ~ file: component.js ~ line 22 ~ DateTimePicker ~ visibleHours', visibleHours);
    console.log('🚀 ~ file: component.js ~ line 18 ~ DateTimePicker ~ userSetting', userSetting);
    console.log('🚀 ~ file: component.js ~ line 17 ~ DateTimePicker ~ reservedTimes', reservedTimes);
    const classes = style();
    const [step, setStep] = useState(0);
    const [selectedIndex, setIndex] = useState();
    // const [selectedDate, handleDateChange] = useState(new Date());
    console.log('🚀 ~ file: component.js ~ line 18 ~ DateTimePicker ~ selectedDate', selectedDate);
    const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
        console.log('🚀 ~ file: component.js ~ line 30 ~ renderWeekPickerDay ~ date', date);
        if (!selectedDate) {
            return <PickersDay {...pickersDayProps} />;
        }

        let status = false;
        const slotStatus = reservedTimes?.timeSlots.map((item) => {
            const start = new Date(item.startTime.time).setHours(0, 0, 0, 0);
            const end = new Date(item.endTime.time);
            const startValue = new Date(start).setHours(0, 0, 0, 0);
            const endValue = new Date(end).setHours(0, 0, 0, 0);
            status = (new Date(startValue).getTime() === new Date(date).getTime()) || (new Date(endValue).getTime() === new Date(date).getTime());
            return status;
        });
        console.log('🚀 ~ file: component.js ~ line 44 ~ slotStatus ~ slotStatus', slotStatus);
        return (
            <PickersDay
                {...pickersDayProps}
                disableMargin
                className={clsx({
                    [classes.highlight]: Array.isArray(slotStatus) && slotStatus.includes(true),
                })}
            />
        );
    };

    if (step === 0) {
        return (
            <>

                <Render condition={userSetting.direction === 'rtl'}>
                    <LocalizationProvider dateAdapter={JalaliUtils}>

                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            label="Basic example"
                            value={selectedDate}
                            // minutesStep={30}
                            onChange={(newValue) => {
                                console.log(newValue, 'nnewvalue');
                                handleDateChange(dayjs(newValue).format());
                                setStep(1);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            // shouldDisableDate={shouldDisableDate}
                            // shouldDisableTime={shouldDisableTime}
                            inputFormat="'Week of' MMM d"
                            minDate={new Date()}
                            // openTo="day"
                            open
                            // ampm={false}
                        />

                    </LocalizationProvider>
                </Render>
                <Render condition={userSetting.direction !== 'rtl'}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            label="Basic example"
                            value={selectedDate}
                            // minutesStep={30}
                            onChange={(newValue) => {
                                console.log(newValue, 'nnewvalue');
                                handleDateChange(dayjs(newValue).format());
                                setStep(1);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            // shouldDisableDate={shouldDisableDate}
                            // shouldDisableTime={shouldDisableTime}
                            inputFormat="'Week of' MMM d"
                            minDate={new Date()}
                            renderDay={renderWeekPickerDay}
                            onMonthChange={onMonthChange}
                            // openTo="day"
                            open
                            // ampm={false}
                        />

                    </LocalizationProvider>

                </Render>
            </>
        );
    }

    const selectTime = (index, slotId) => {
        setIndex(index);
        setSelectedSlot(slotId);
    };

    return (
        <div className={classes.container}>
            <Grid alignContent="center" xs={12}>
                <IconButton onClick={() => setStep(0)}>
                    {
                        userSetting.direction === 'rtl' ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />
                    }
                </IconButton>
                {
                    userSetting.direction === 'rtl' ? getDayDateFa(selectedDate) : getDayDate(selectedDate)
                }
            </Grid>
            <div className={classes.timeSlots_container}>
                <div>
                    <FormattedMessage id="pal.select_time" />
                </div>
                <div className={classes.chips_container}>
                    {
                        visibleHours.map((item, index) => (
                            <div
                                onClick={() => selectTime(index, item)}
                                className={index === selectedIndex ? clsx(classes.chips, classes.selected) : classes.chips}
                            >
                                {getHourMinutes(item.startTime.time)}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

DateTimePicker.propTypes = {

};

export default DateTimePicker;
