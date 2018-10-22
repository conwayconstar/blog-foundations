module.exports = async function (req, res, proceed) {

  // Check if user is logged in with session.
  if (req.session.userId) {
    return proceed();
  }

  // Otherwise, this request did not come from a logged-in user.
  return res.forbidden();

};
