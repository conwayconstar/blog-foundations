module.exports = {

  friendlyName: 'Check',

  description: 'Check user.',

  fn: async function (inputs, exits) {
    let user = null;

    // Find the user from the current session
    if(this.req.session.userId)
      user = await User.findOne({
        id: this.req.session.userId,
      });

    return exits.success(user);
  }
};
