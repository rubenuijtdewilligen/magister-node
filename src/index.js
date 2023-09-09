import { config } from 'dotenv';
config();
import { AuthManager } from 'magister-openid';
import { getAuthCode } from './utils/authCode.js';
import MagisterClient from './client/Client.js';

/**
 * Generate an access token and refresh token for the user
 * @param {String} tenant School name in most cases, your school's Magister instance is on [tenant].magister.net
 * @param {String} username
 * @param {String} password
 */
const getUserTokens = async (tenant, username, password) => {
  const manager = new AuthManager(`${tenant}.magister.net`);
  const authCode = await getAuthCode();

  const tokenSet = await manager.login(username, password, authCode);
  return tokenSet;
};

export { MagisterClient, getUserTokens };
