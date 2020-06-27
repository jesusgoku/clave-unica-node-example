import axios from 'axios';

class ClaveUnica {
  constructor({ accessToken }) {
    this.config = {
      accessToken,
    };
  }

  async getUserInfo() {
    const { accessToken } = this.config;

    const response = await axios({
      url: 'https://www.claveunica.gob.cl/openid/userinfo/',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }
}

export default ClaveUnica;
