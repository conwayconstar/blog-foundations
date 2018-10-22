module.exports = {


  friendlyName: 'Verify',


  description: 'Verify email.',


  inputs: {

    token: {
      description: 'Verify token from the email.',
      example: 'INI98CcUNIgLNzq9XIw'
    }

  },


  exits: {

    invalidToken: {
      responseType: 'invalidToken',
      description: 'The token provided is invalid.',
    },

  },


  fn: async function (inputs, exits) {

    // Check if token exists
    if (!inputs.token)
      // Throw invalidToken if not
      throw 'invalidToken';

    // Get the user by email token
    let user = await User.findOne({ emailVerifyToken: inputs.token });

    // If the user cannot be found or the verify token
    // has expired throw invalidToken.
    if (!user || user.emailVerifyTokenExpiry <= Date.now())
      throw 'invalidToken';

    // If the users email is already verified
    if(user.emailStatus === 'verified')
    // Throw the custom response invalidToken with a custom message
      throw { invalidToken : 'Your email is already verified.'};

    if (user.emailStatus === 'unconfirmed') {
      // If the users email status is unconfirmed
      // update the users email parameters
      await User.update({ id: user.id }).set({
        emailStatus: 'confirmed',
        emailVerifyToken: '',
        emailVerifyTokenExpiry: 0
      });

      // Set the current user session
      this.req.session.userId = user.id;

      // Done!
      return exits.success();

    } else if(user.emailStatus === 'newEmail') {
      // Else if the email status is set to newEmail
      // update the users email
      await User.update({ id: user.id }).set({
        emailStatus: 'confirmed',
        emailVerifyToken: '',
        emailVerifyTokenExpiry: 0,
        emailRequested: '',
        emailAddress: user.emailRequested
      });

      // Set the current user session
      this.req.session.userId = user.id;

      // Done!
      return exits.success();

    }

  }


};
