module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {

    emailAddress: {
      type: 'string',
      required: true
    },

    password: {
      type: 'string',
      required: true
    },

    rememberMe: {
      description: 'Whether the user wishes to extend the session length.',
      type: 'boolean'
    }

  },


  exits: {

    badCombo: {
      description: 'The password doest match teh email address supplied.',
      responseType: 'badCombo',
    },

    inexistentUser: {
      description: 'The details provided does not match any user registered.',
      responseType: 'inexistentUser',
    },

  },


  fn: async function (inputs, exits) {
    // Check if the user exists
    let user = await User.findOne({
      emailAddress: inputs.emailAddress.toLowerCase(),
    });

    // if the user cannot be found throw a bad combo
    if(!user)
      throw 'inexistentUser';

    // Check if the user has sent the correct password.
    await sails.helpers.passwords.checkPassword(inputs.password, user.password)
      .intercept('incorrect', 'badCombo');

    // Check if the user has selected the rememberMe option
    if (inputs.rememberMe)
      // Set the cookie max age to 30 days
      this.req.session.cookie.maxAge = 30*24*60*60*1000;

    // Store the user's new id in their session.
    this.req.session.userId = user.id;

    // Send the user with a 200 response
    return exits.success(user);
  }


};
