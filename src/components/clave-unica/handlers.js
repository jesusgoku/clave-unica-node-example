import claveUnicaAuth from './services/claveUnicaAuth';
import ClaveUnica from './libraries/claveUnica';

function login(_req, res) {
  const url = claveUnicaAuth.getUrl();

  res.send(`
  <a href="${url}"><img src="/static/images/btn_claveunica_202px.png" alt="Botón Clave Única" /></a>
  `);
}

async function callback(req, res) {
  const { code, state } = req.query;

  const data = await claveUnicaAuth.getToken({ code, state });

  const { accessToken } = data;

  const claveUnica = new ClaveUnica({ accessToken });
  const user = await claveUnica.getUserInfo();

  req.session.accessToken = accessToken;
  req.session.user = user;

  res.redirect('/me');
}

/**
 * Display user info from Clave Única
 *
 * @param {Request} req - Express Request
 * @param {Response} res - Express Response
 */
async function me(req, res) {
  const { accessToken } = req.session;

  const claveUnica = new ClaveUnica({ accessToken });

  const user = await claveUnica.getUserInfo();

  res.json(user);
}

function logout(req, res) {
  req.session.destroy();

  res.redirect('/');
}

export { login, callback, me, logout };
