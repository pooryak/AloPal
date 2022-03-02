const axios = require('axios');

// call postman api async
const loadSwagger = (url) => new Promise((resolve, reject) => {
    // resolve(); // force to use postman_local file
    console.log('\n #####------------> calling swagger ');
    axios
        .get(url)
        .then((res) => {
            console.log('\n #####------------> swagger received -> ', res.status);
            resolve(res.data);
        })
        .catch((error) => {
            resolve();
            console.log('\n #####------------> swagger call failed ');
            console.log('\n #####------------> status -> ', error.code);
            console.log('\n #####------------> going local ');
            // console.error(error);
        });
});

module.exports = loadSwagger;
