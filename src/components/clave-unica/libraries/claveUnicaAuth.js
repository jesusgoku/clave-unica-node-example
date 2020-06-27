/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/camelcase */
import axios from 'axios';
import crypto from 'crypto';

/**
 * @typedef {Object} ClaveUnicaOptions
 * @property {String} clientId - app client id
 * @property {String} clientSecret - app client secret
 * @property {String} redirectUri - redirect uri setting on activation
 *
 * @typedef {Object} GetTokenOptions
 * @property {String} state - code generated on first step of authorization flow
 * @property {String} code - code obtained on first step of authorization flow
 *
 * @typedef {Object} GetTokenResponse
 * @property {String} access_token - access token
 * @property {String} refresh_token - refresh token for obtain another access token
 * @property {String} token_type - type of token (bearer)
 * @property {String} id_token - JWT token for unknown
 * @property {Number} expires_in - time to live access token
 *
 * @typedef {Object} AuthTokens
 * @property {String} accessToken - access token
 * @property {String} refreshToken - refresh token
 * @property {String} expiresIn - time to live access token
 * @property {String} tokenType - type of token (bearer)
 */

 /**
  * SDK for ClaveUnica auth
  */
class ClaveUnicaAuth {
  /**
   *
   * @param {ClaveUnicaOptions} param0
   */
  constructor({
    clientId,
    clientSecret,
    redirectUri,
  }) {
    this.config = {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
    };
  }

  /**
   * Get url for start authentication flow
   *
   * @returns {String} url for start authentication flow
   */
  getUrl() {
    const { client_id, redirect_uri } = this.config;

    const TOKEN_LENGTH = 30;
    const TOKEN_BYTES = Math.ceil(TOKEN_LENGTH / 2);

    const token = crypto.randomBytes(TOKEN_BYTES).toString('hex');

    const params = new URLSearchParams({
      client_id,
      response_type: 'code',
      scope: 'openid run name email',
      redirect_uri,
      state: token,
    });

    return `https://accounts.claveunica.gob.cl/openid/authorize/?${params}`;
  }

  /**
   * Get token from code
   *
   * @param {GetTokenOptions} options - options for request
   *
   * @returns {AuthTokens}
   */
  async getToken({ code, state }) {
    const {
      client_id,
      client_secret,
      redirect_uri,
    } = this.config;

    const response = await axios({
      url: 'https://accounts.claveunica.gob.cl/openid/token/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: new URLSearchParams({
        client_id,
        client_secret,
        redirect_uri,
        grant_type: 'authorization_code',
        code,
        state,
      }),
    });

    return ClaveUnicaAuth.transformTokenResponse(response.data);
  }

  /**
   * Obtain an access token from a refresh token
   *
   * @param {String} refresh_token - refresh token for obtain access token
   *
   * @return {AuthTokens}
   */
  async refreshToken(refresh_token) {
    const {
      client_id,
      client_secret,
      redirect_uri,
    } = this.config;

    const response = await axios({
      url: 'https://accounts.claveunica.gob.cl/openid/token/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      data: new URLSearchParams({
        client_id,
        client_secret,
        redirect_uri,
        refresh_token,
        grant_type: 'refresh_token',
      }),
    });

    return ClaveUnicaAuth.transformTokenResponse(response.data);
  }

  /**
   * Transform getToken response to property in lower camel case
   *
   * @private
   * @param {GetTokenResponse} tokenResponse - token response object
   *
   * @returns {AuthTokens}
   */
  static transformTokenResponse({
    access_token: accessToken,
    refresh_token: refreshToken,
    token_type: tokenType,
    expires_in: expiresIn,
  }) {
    return { accessToken, refreshToken, tokenType, expiresIn };
  }
}

export default ClaveUnicaAuth;
