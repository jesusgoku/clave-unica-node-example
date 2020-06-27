function isAuth(req, res, next) {
  if (!req.session.accessToken) {
    res.redirect('/login');
    return;
  }

  next();
}

export {
  // eslint-disable-next-line import/prefer-default-export
  isAuth,
};
