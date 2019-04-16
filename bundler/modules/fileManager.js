const fs = require('fs');
const ncp = require('ncp').ncp;ncp.limit = 16;

class FileManager {
  readAggregateFilesData(filePaths) {
    let fullData = '';
    if (Array.isArray(filePaths)) {
      filePaths.forEach((filePath) => {
        fullData = fullData + this.readFile(filePath);
      });
    } else if (typeof filePaths === 'string') {
      fullData = this.readFile(filePaths);
    }
    return fullData;
  }

  readFile(filePath) {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch(err) {
      throw err;
    }
  }

  createWriteFile(data, filePath) {
    return fs.writeFile(filePath, data, (err) => {
      if (err) {
        throw err;
      }
      console.log(`${filePath} file created.`);
    });
  }

  copyDir(source, destination) {
    return ncp(source, destination, (err) => {
      if (err) {
        throw err;
      }
      console.log(`${source} folder copied to ${destination}`);
    });
  }
};

module.exports = FileManager;
