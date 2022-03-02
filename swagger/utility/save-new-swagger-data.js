const fs = require('fs');

const saveNewSwaggerData = async (newSwaggerData) => await fs.writeFile(
    './swagger_local.json',
    JSON.stringify(newSwaggerData),
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(' #####------------> Swagger_local.json added ');
        }
    },
);

module.exports = saveNewSwaggerData;
