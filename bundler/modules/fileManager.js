const fs = require('fs');
// const ncp = require('ncp').ncp;

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
    this.checkCreateDirsForFile(filePath);
    try {
      fs.writeFileSync(filePath, data);
      return console.log(`${filePath} file created.`);
    } catch(err) {
      throw err;
    }
  }

  // copyDir(source, destination) {
  //   return ncp(source, destination, (err) => {
  //     if (err) {
  //       throw err;
  //     }
  //     console.log(`${source} folder copied to ${destination}`);
  //   });
  // }

  checkCreateDirsForFile(futureFilePath) {
    const dirsList = futureFilePath.split('/');
    const dirsLength = dirsList.length - 2; // -1 => to have index instead of count. -2 => to exclude filename

    let dirPath = '';
    for (let i = 0; i <= dirsLength; i++) {
      dirPath = `${dirPath}/${dirsList[i]}`;
      try {
        if (!fs.existsSync(dirPath)){
          fs.mkdirSync(dirPath);
        }
      } catch (err) {
        throw err;
      }
    }
  }
  
};

module.exports = FileManager;
