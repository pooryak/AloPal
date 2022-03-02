const {
  camelCase, pascalCase, snakeCase, paramCase
} = require('change-case');
const createRequestGroupFile = require('./create-request-group-file');
const createDirectory = require('./create-directory');
const addIndexFile = require('./add-index-file');

const createCollectionTree = async (treeMap, destPath, requestGroupTemplate, indexTemplate) => {
  treeMap.map(async (item) => {
    const paramCaseName = paramCase(item.name.replace(' ', ''));
    const newPath = [destPath, paramCaseName].join('/');
    // create a directory for current item
    // [x] create file per request
    // if current item has request lets create request files
    // if (item.requests.length > 0) {
    //     await createDirectory(newPath);
    //     let stackFileNames = [];
    //     await item.requests.map(async req => {
    //         stackFileNames.push(req.name);
    //         await createRequestFile(newPath, req);
    //     });
    //     await addIndexFile(newPath, stackFileNames);
    // }

    if (item.requests.length > 0) {
      await createRequestGroupFile(destPath, paramCaseName, item.requests, requestGroupTemplate);
    }

    // if current item has sub folder lets create that by recursive callback
    if (item.folders.length > 0) {
      await createDirectory(newPath);
      const dirList = item.folders.reduce((acc, dirObj) => {
        if (dirObj.requests.length > 0 || dirObj.folders.length > 0) {
          return [...acc, dirObj.name];
        }
        return [...acc];
      }, []);
      await addIndexFile(indexTemplate, newPath, dirList);
      await createCollectionTree(item.folders, newPath, requestGroupTemplate, indexTemplate);
    }
  });
};


module.exports = createCollectionTree;
