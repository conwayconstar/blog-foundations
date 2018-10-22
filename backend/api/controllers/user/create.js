module.exports = {


  friendlyName: 'Create',


  description: 'Create user.',


  inputs: {

    emailAddress: {
      type: 'string',
      required: true,
      isEmail: true,
      maxLength: 200,
      example: 'conway@fullstackedkush.com'
    },

    fullName: {
      type: 'string',
      required: true,
      maxLength: 50,
      example: 'Conway Kush'
    },

    password: {
      type: 'string',
      required: true,
      example: '_[`~(xY([H9}vD`"'
    }

  },


  exits: {

    emailNotUnique: {
      responseType: 'emailNotUnique',
      description: 'The email address provided is already in use'
    },

  },


  fn: async function (inputs, exits) {

    let newUser = await User.create({
      // Transform Email address to lowercase
      emailAddress: inputs.emailAddress.toLowerCase(),
      fullName: inputs.fullName,
      // Hash the users password
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      // Generate a URL friendly token to verify users email address
      emailVerifyToken: await sails.helpers.strings.random('url-friendly'),
      // Set verify tokens expiry to 24 hours from creation
      emailVerifyTokenExpiry: Date.now() + 24 * 60 * 60 * 1000,
      // "isAdmin : true" IS FOR TESTING ONLY!!!! REMOVE WHEN YOU ARE READY!!!
      isAdmin: true
    })
      // Intercept the E_UNIQUE response with the emailNotUnique response
      .intercept('E_UNIQUE', 'emailNotUnique')
      // Fetch user if created
      .fetch();

    // Store the user's new id in their session.
    this.req.session.userId = newUser.id;

    // Send email verify email
    await sails.helpers.sendEmail.with({
      to: newUser.emailAddress,
      subject: 'Verify your account!',
      template: 'verify-account',
      templateData: {
        fullName: newUser.fullName,
        token: newUser.emailVerifyToken
      }
    });

    // Send the user with a 200 response
    return exits.success(newUser);
  }
};
