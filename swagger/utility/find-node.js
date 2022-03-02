const findRequests = require('./find-requests');

const findNode = (parent_folder_id, FOLDERS, REQUESTS) => {
  const tmp = [];

  // collect all folder from postman file for current node
  const selectedFolderByParentId = FOLDERS.filter(
    (item) => item.folder === parent_folder_id
  );

  // create child object and push to the stack
  selectedFolderByParentId.map((folder) => {
    tmp.push({
      folders: findNode(folder.id, FOLDERS, REQUESTS),
      hasChild: folder.folders_order && folder.folders_order.length > 0,
      id: folder.id,
      isRepo: !folder.folder,
      name: folder.name,
      requests: findRequests(folder.id, REQUESTS)
    });
  });
  return tmp;
};

module.exports = findNode;
