const { camelCase } = require('change-case');
const handlebars = require('handlebars');
const {
    loadSwagger,
    saveNewSwaggernData,
    deleteOldRepoDirectory,
    openFile,
    createDirectory,
} = require('./utility');

const getSwagger = require('./get_swagger');

const { SWAGGER_LOCAL_PATH, PACKAGE_JSON_PATH } = require('./constans');

// define global variables
let requestTemplateString;
let indexTemplateString;
let requestGroupTemplateString;
let requestTemplate;
let indexTemplate;
let requestGroupTemplate;
let SWAGGER_LOCAL;

// define handlebars helper function
handlebars.registerHelper('ifEquals', function (a, b, opts) {
    if (a === b) {
        return opts.fn(this);
    }
    return opts.inverse(this);
});

handlebars.registerHelper('camelCase', (name) => camelCase(name));

// open local postman async
try {
    SWAGGER_LOCAL = JSON.parse(openFile(SWAGGER_LOCAL_PATH));
} catch (e) {
    SWAGGER_LOCAL = null;
}

// open package.json file
const PACKAGE_JSON = JSON.parse(openFile(PACKAGE_JSON_PATH));

// get config from package.json -> postman
const swaggerRepositoryUrl = PACKAGE_JSON.swagger.repository_url;
const outputPath = PACKAGE_JSON.swagger.target;

const start = async (swaggerData) => {
    try {
    // open template files and store in globals
        requestTemplateString = await openFile(
            '/swagger/templates/request-template.hbs',
        );
        indexTemplateString = await openFile(
            '/swagger/templates/index-template.hbs',
        );
        requestGroupTemplateString = await openFile(
            '/swagger/templates/request-group-template.hbs',
        );

        // make template
        requestTemplate = handlebars.compile(requestTemplateString);
        indexTemplate = handlebars.compile(indexTemplateString);
        requestGroupTemplate = handlebars.compile(requestGroupTemplateString);

        // cleaning old repository if exist
        await deleteOldRepoDirectory(outputPath);

        // create new root directory for repository folder
        await createDirectory(outputPath);

        await getSwagger({
            swaggerData,
            indexTemplate,
            outputPath,
            requestGroupTemplate,
            requestTemplate,
        });
    } catch (e) {
        console.log('start -> catch -> ', e);
    }
};

loadSwagger(swaggerRepositoryUrl)
    .then((newSwaggerData) => {
        // start after response
        start(newSwaggerData);
        saveNewSwaggernData(newSwaggerData);
    })
    .catch((e) => {
        console.log('\n\n ##-> start => get postman failed');
        console.log('##-> start => e -> ', e);
        if (SWAGGER_LOCAL) {
            console.log('\n\n ##-> start postman from local');
            start(SWAGGER_LOCAL);
        }
    });
