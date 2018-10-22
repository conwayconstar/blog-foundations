module.exports = async function (req, res, proceed) {

  // Check if user is logged in with session.
  if (!req.session.userId)
    return res.forbidden();

  // Find the user
  let user = await User.findOne({
    id: req.session.userId,
  });
  // Check if the user is an admin
  if(user.isAdmin)
    return proceed();

  // Otherwise, this request did not come from a admin user.
  return res.forbidden();
};
