module.exports = {


  friendlyName: 'Update',


  description: 'Update user.',


  inputs: {

    emailAddress: {
      type: 'string',
      isEmail: true,
      maxLength: 200,
      example: 'conway@fullstackedkush.com'
    },

    fullName: {
      type: 'string',
      maxLength: 50,
      example: 'Conway Kush'
    },

    password: {
      type: 'string',
      example: '_[`~(xY([H9}vD`"'
    },

    confirmPassword: {
      type: 'string',
      example: '_[`~(xY([H9}vD`"'
    }

  },


  exits: {

    emailNotUnique: {
      responseType: 'emailNotUnique',
      description: 'The email address provided is already in use'
    },

    badCombo: {
      description: 'Password provided does not match the current user',
      statusCode: 401,
    },

    nothingToUpdate: {
      statusCode: 400,
      description: 'Nothing to update'
    },

  },


  fn: async function (inputs, exits) {
    // Get the current users details
    let user = await User.findOne({
      id: this.req.session.userId,
    });

    let updatedValues = {};

    // Set email to lowercase
    let newEmailAddress =
      inputs.emailAddress !== undefined ?
        inputs.emailAddress.toLowerCase() : undefined;

    // Check if the user is updating their email address
    if (newEmailAddress !== undefined && newEmailAddress !== user.emailAddress) {
      // Check if the email requested is being used
      if (await User.findOne({
        or: [{emailAddress: newEmailAddress}, {emailRequested: newEmailAddress}]
      }))
        throw 'emailNotUnique';

      updatedValues = Object.assign(updatedValues, {
        // Set new email as email requested
        emailRequested: inputs.emailAddress.toLowerCase(),
        // Set email status to newEmail
        emailStatus: 'newEmail',
        // Generate a URL friendly token to verify users email address
        emailVerifyToken: await sails.helpers.strings.random('url-friendly'),
        // Set verify tokens expiry to 24 hours from creation
        emailVerifyTokenExpiry: Date.now() + 24 * 60 * 60 * 1000,
      });
    }

    // Check if the users is updating their full name
    if (inputs.fullName !== undefined && inputs.fullName !== user.fullName)
      updatedValues = Object.assign(updatedValues, {
        fullName: inputs.fullName
      });

    // Check if the user is updating their password
    if (inputs.password) {
      // Check if the user has inputted the correct password in the confirm field
      await sails.helpers.passwords.checkPassword(inputs.confirmPassword, user.password)
        .intercept('incorrect', 'badCombo');
      updatedValues = Object.assign(updatedValues, {
        // Hash the users password
        password: await sails.helpers.passwords.hashPassword(inputs.password)
      });
    }

    // Check if there is nothing to update
    if (!Object.keys(updatedValues).length)
      throw 'nothingToUpdate';

    // Update the user in the DB
    let updatedUser = await User.update({id: user.id})
      .set(updatedValues).fetch();

    // Check if the user is updating their email address
    if (newEmailAddress !== undefined && newEmailAddress !== user.emailAddress) {
      // Send email verify email
      await sails.helpers.sendEmail.with({
        to: newUser.emailAddress,
        subject: 'Verify your new email!',
        template: 'verify-new-email',
        templateData: {
          fullName: newUser.fullName,
          token: newUser.emailVerifyToken
        }
      });
    }

    // Return the updated user, or if they aren't found return 404
    return updatedUser ? exits.success(updatedUser) : exits.notFound;

  }


};
