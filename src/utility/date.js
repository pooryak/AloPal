import dayjs from 'dayjs';
import jalaliday from 'jalaliday';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(jalaliday);
dayjs.extend(timezone);
dayjs.extend(utc);

export const getYear = (lang) => {
    if (lang === 'fa') {
        return dayjs().calendar('jalali').locale('fa').year();
    }
    return dayjs().year();
};

export const getFullDay = (date) => dayjs(date).format('DD MMM YYYY'); // 30 Jan 2021

export const getDayDate = (date) => dayjs(date).format('dddd, MMMM D YYYY'); //  Tuesday, June 1 2021

export const getDayDateFa = (date) => dayjs(date).calendar('jalali').locale('fa').format('dddd,D MMMM YYYY'); // سه‌شنبه,11 خرداد 1400

export const getHourMinutes = (date) => dayjs(date).format('HH:mm'); // 22:22

export const getFullDayAdDate = (date) => {
    if (date) {
        return dayjs(date).format('dddd, MMMM D YYYY HH:mm');
    }
};

export const over18 = (date) => {
    const thisYear = dayjs();
    const isOver = thisYear.diff(date, 'year') >= 18;

    return isOver;
};
