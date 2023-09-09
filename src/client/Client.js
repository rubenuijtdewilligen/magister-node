import Methods from './Methods.js';

class MagisterClient {
  /**
   * Main class constructor
   * @param {String} host School name in most cases, your school's Magister instance is on [tenant].magister.net
   * @param {String} accessToken Can be received from getUserTokens()
   */
  constructor(tenant, accessToken) {
    this.tenant = tenant;
    this.accessToken = accessToken;
  }

  /**
   * Gets the account details associated with this.hostUrl and this.hostKey
   *
   * @returns {Promise}
   */
  getAanmelding(id) {
    return new Promise((res, rej) => {
      Methods.getAanmelding(this.tenant, this.accessToken, [id])
        .then((response) => {
          return res(response.data);
        })
        .catch((err) => rej(err));
    });
  }
}

export default MagisterClient;
