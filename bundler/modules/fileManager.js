const fs = require('fs');
var path = require('path');
const Networking = require('./networking');
const Utils = require('./utils');

class FileManager {
  constructor(networker = new Networking()) {
    this.networker = networker;
  }

  isPathUrl(filePath) {
    const { protocol } = this.networker.parseUrl(filePath);
    return protocol === 'https' || protocol === 'http';
  }

  async readAggregateFilesData(filePaths, returnIfNotFound=true, pathNotFoundFunc=null) {
      let fullData = '';
      if (Array.isArray(filePaths)) {
        await Utils.asyncForEach(filePaths, async (filePath) => {
          try {
            if (this.isPathUrl(filePath)) {
              fullData = fullData + '\n' + await this.networker.fetchRemoteFileData(filePath);
            } else {
              fullData = fullData + '\n' + this.readFile(filePath);
            }
          } catch(err) {
            if (pathNotFoundFunc) pathNotFoundFunc(filePath);
            if (returnIfNotFound) return null;
          }
        });
      } else if (typeof filePaths === 'string') {
        try {
          fullData = this.readFile(filePaths);
        } catch(err) {
          if (pathNotFoundFunc) pathNotFoundFunc(filePath);
          if (returnIfNotFound) return null;
        }
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
      return true;
    } catch(err) {
      throw err;
    }
  }

  checkCreateDirsForFile(futureFilePath) {
    const dirsList = futureFilePath.split('/');
    const dirsLength = dirsList.length - 2; // -1 => to have index instead of count. -2 => to exclude filename

    let dirPath = '.';
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


  _copyFileSync(source, target) {
      var targetFile = target;
      // If target is a directory, a new file with the same name will be created
      if (fs.existsSync(target)) {
          if (fs.lstatSync(target).isDirectory()) {
              targetFile = path.join(target, path.basename(source));
          }
      }
      fs.writeFileSync(targetFile, fs.readFileSync(source));
  }

  copyFolderRecursiveSync(source, target) {
      if (!fs.existsSync(source)) return false;
      var files = [];

      // Check if folder needs to be created or integrated
      var targetFolder = path.join( target, path.basename(source));
      if (!fs.existsSync(targetFolder)) {
          fs.mkdirSync(targetFolder);
      }

      // Copy
      if (fs.lstatSync(source).isDirectory()) {
          files = fs.readdirSync(source);
          var _this = this;
          files.forEach(function(file) {
              var curSource = path.join(source, file);
              if (fs.lstatSync(curSource).isDirectory()) {
                  _this.copyFolderRecursiveSync(curSource, targetFolder);
              } else {
                  _this._copyFileSync(curSource, targetFolder);
              }
          });
      }
      return true;
  }

  removeFolder(path) {
    if (fs.existsSync(path)) fs.rmdirSync(path, { recursive: true });
  }

  overwriteFolder(path) {
    this.removeFolder(path);
    fs.mkdirSync(path);
  }
  
};

module.exports = FileManager;
