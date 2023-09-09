import MagisterRequest from './MagisterRequest.js';

const getAanmelding = (tenant, accessToken, id) => {
  let req = new MagisterRequest(tenant, accessToken);
  return req.executeGet('GET_AANMELDING', '', [id]);
};

export default { getAanmelding };
