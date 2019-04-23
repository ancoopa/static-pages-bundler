const networker = new (require('./networking'))();
const fileManager = new (require('./fileManager'))();
const path = require('path');

describe('Networker', () => {
  const DATA_URL_HTTPS = 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
  const DATA_URL_HTTP = 'http://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
  const DATA_URL_NO_PROTOCOL = 'www.stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
  const DATA_URL_NO_PROTOCOL_NO_WWW = 'stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css';
  const DATA_MOCK = fileManager.readFile(path.join(__dirname, '../test_data/networking/bootstrap.min.css'));

  test('Get proper data from URL with HTTPS protocol.', async (done) => {
    const data = await networker.getRemoteFileData(DATA_URL_HTTPS);
    expect(data).toEqual(DATA_MOCK);
    done();
  });

  test('Get proper data from URL with HTTP protocol.', async (done) => {
    const data = await networker.getRemoteFileData(DATA_URL_HTTP);
    expect(data).toEqual(DATA_MOCK);
    done();
  });

  test('Get proper data from URL with no protocol.', async (done) => {
    await expect(() => networker.getRemoteFileData(DATA_URL_NO_PROTOCOL)).toThrow(new Error('URL protocol should be HTTPS ot HTTP.'));
    done();
  });

  test('Get proper data from URL with no protocol and no "www"', async (done) => {
    await expect(() => networker.getRemoteFileData(DATA_URL_NO_PROTOCOL_NO_WWW)).toThrow(new Error('URL protocol should be HTTPS ot HTTP.'));
    done();
  });

});
