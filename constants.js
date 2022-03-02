module.exports = {
    baseUrl: 'http://80.241.214.236:8080/',
    timeout: 45000,
    Accept: 'application/x-protobuf',
    'Content-Type': 'application/x-protobuf',
    'Accept-Language': 'en',
    userTypes: {
        ALO: 0,
        PAL: 1,
        ADMIN: 2,
    },
    currencies: ['AUD', 'USS', 'CAD', 'IRR'],
    degrees: [{
        title: 'Undergraduate Degrees',
        value: 'Undergraduate Degrees',
    }, {
        title: 'Bachelor Degrees',
        value: 'Bachelor Degrees',
    }, {
        title: 'Graduate Degrees',
        value: 'Graduate Degrees',
    }, {
        title: 'Master Degrees',
        value: 'Master Degrees',
    }, {
        title: 'Doctoral Degrees',
        value: 'Doctoral Degrees',
    }],
    speciality: [
        {
            title: 'Sports',
            value: 'Sports',
        },
    ],
    english_level: [
        {
            title: 'Good',
            value: 'Good',
        },
        {
            title: 'bad',
            value: 'bad',
        },
    ],
    social_addresses: [{
        title: 'whatsapp',
        address: '/ws',
    }, {
        title: 'facebook',
        address: 'https://fb.com/alopal',
    }, {
        title: 'telegram',
        address: 'https://fb.com/alopal',
    }, {
        title: 'instagram',
        address: 'https://instagram.com/alopal',
    },{
        title: 'twitter',
        address: 'https://instagram.com/alopal',
    },
    {
        title: 'linkedin',
        address: 'https://instagram.com/alopal',
    }],
};
