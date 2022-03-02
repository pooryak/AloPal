import { useState } from 'react';
import jMoment from 'moment-jalaali';

const index = () => {
    const [local, setLocal] = useState('en');
    const [direction, setDirection] = useState('ltr');
    const [mode, setMode] = useState('light');
    const localChanger = (data) => {
        setLocal(data.language);
        setDirection(data.direction);
        if (data.direction === 'rtl') {
            jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
        }
    };
    const changeMode = (data) => {
        console.log('🚀 ~ file: useSettings.js ~ line 16 ~ changeMode ~ data', data);

        setMode(data);
    };
    return {
        local, direction, localChanger, changeMode, mode,
    };
};

export default index;
