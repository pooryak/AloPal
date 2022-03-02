const fs = require('fs');
const rimraf = require('rimraf');

const deleteOldRepoDirectory = (repoPath) =>
  new Promise((resolve) => {
    if (fs.existsSync(repoPath)) {
      rimraf(repoPath, () => {
        console.warn('\n #####------------> old repo deleted \n');
        resolve(true);
      });
    } else {
      resolve(true);
    }
  });

module.exports = deleteOldRepoDirectory;
