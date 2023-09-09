import axios from 'axios';

class MagisterRequest {
  constructor(tenant, accessToken) {
    this.hostUrl = `https://${tenant}.magister.net/`;
    this.accessToken = accessToken;
  }

  /**
   * Executes this request object as GET
   * @param request
   * @returns {PromiseLike<any> | Promise<any>}
   */
  async executeGet(request, queryParams, routeParams) {
    this.endpoint = request;
    return await axios.default({
      url: queryParams ? this.trimUrl(routeParams) + queryParams : this.trimUrl(routeParams),
      method: 'GET',
      followRedirects: true,
      maxRedirects: 5,
      headers: this.getHeaders(),
    });
  }

  trimUrl(routeParams) {
    let lastChar = this.hostUrl.charAt(this.hostUrl.length - 1);
    if (lastChar !== '/') {
      this.hostUrl = this.hostUrl + '/';
    }

    const endpoint = this.replaceRouteParameters(this.getRequestEndpoint(), routeParams);
    return this.hostUrl + endpoint;
  }

  getRequestEndpoint() {
    switch (this.endpoint.toUpperCase()) {
      case 'GET_AANMELDING': {
        return 'api/aanmeldingen/parameter';
      }
    }
  }

  /**
   * Returns the header needed for a request
   * @returns {{Authorization: string, "Content-Type": string}}
   */
  getHeaders() {
    return {
      Authorization: 'Bearer ' + this.accessToken,
      'Content-Type': 'application/json',
    };
  }

  replaceRouteParameters(url, values) {
    let array = url.split('/');
    let indices = array.map((e, i) => (e === 'parameter' ? i : '')).filter(String);

    let currentValuesIndex = 0;
    indices.forEach((index) => {
      array[index] = values[currentValuesIndex];
      currentValuesIndex++;
    });

    return array.join('/');
  }
}

export default MagisterRequest;
