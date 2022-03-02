const SERVER_URL = '{{career_base_url}}';
const SWAGGER_LOCAL_PATH = './swagger_local.json';
const PACKAGE_JSON_PATH = './package.json';
const COLLECTION_POSTFIX = 'Repository';
const HTTP_INSTANCE_IMPORT = 'import { Http } from "[path]"'; // replace [path] with npm package name
const HTTP_INSTANCE_DIR_NAME = 'src/utility'; // path from src
const IS_HTTP_INSTANCE_RELATIVE = true; // check if http instance isn't npm package
const HTTP_INSTANCE = 'Http.instance';

module.exports = {
    COLLECTION_POSTFIX,
    HTTP_INSTANCE,
    HTTP_INSTANCE_IMPORT,
    PACKAGE_JSON_PATH,
    SWAGGER_LOCAL_PATH,
    SERVER_URL,
    HTTP_INSTANCE_DIR_NAME,
    IS_HTTP_INSTANCE_RELATIVE,
};
