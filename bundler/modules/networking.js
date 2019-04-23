const http = require('http');
const https = require('https');

class Networker {
  getRemoteFileData(url) {
    const request = this.pickupRequestLibrary(url);
    return new Promise((resolve, reject) => {
      request.get(url, (res) => {
        res.on('error', (e) => {
          reject(e);
        });
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () => {
          resolve(body);
        });
      });
    }); 
  }

  pickupRequestLibrary(url) {
    const { protocol } = this.parseUrl(url);
    if (protocol === 'https') {
      return https;
    } else if (protocol === 'http') {
      return http;
    }
    throw new Error('URL protocol should be HTTPS ot HTTP.');
  }

  parseUrl(url) {
    const match = url.match(/^(http|https|ftp)?(?:[\:\/]*)([a-z0-9\.-]*)(?:\:([0-9]+))?(\/[^?#]*)?(?:\?([^#]*))?(?:#(.*))?$/i);
    const result = {
      protocol: '',
      host: match[2],
      port: '',
      path: '',
      query: '',
      fragment: ''
    };
    if(match[1]) result['protocol'] = match[1];
    if(match[3]) result['port']     = match[3];
    if(match[4]) result['path']     = match[4];
    if(match[5]) result['query']    = match[5];
    if(match[6]) result['fragment'] = match[6];
    return result;
  }
}

module.exports = Networker;
