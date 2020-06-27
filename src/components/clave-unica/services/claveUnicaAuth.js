import ClaveUnicaAuth from '../libraries/claveUnicaAuth';

import {
  CLAVE_UNICA_CLIENT_ID,
  CLAVE_UNICA_CLIENT_SECRET,
  CLAVE_UNICA_REDIRECT_URI,
} from '../../../config';

const claveUnicaAuth = new ClaveUnicaAuth({
  clientId: CLAVE_UNICA_CLIENT_ID,
  clientSecret: CLAVE_UNICA_CLIENT_SECRET,
  redirectUri: CLAVE_UNICA_REDIRECT_URI,
});

export default claveUnicaAuth;
