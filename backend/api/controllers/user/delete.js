module.exports = {


  friendlyName: 'Delete',


  description: 'Delete user.',


  inputs: {

    password: {
      type: 'string'
    },

  },


  exits: {

    badCombo: {
      description: 'Password provided does not match the current user',
      statusCode: 401,
    },

  },


  fn: async function (inputs, exits) {

    // Get the current users details
    let user = await User.findOne({
      id: this.req.session.userId,
    });

    // Check if the user has inputted the correct password in the confirm field
    await sails.helpers.passwords.checkPassword(inputs.password, user.password)
      .intercept('incorrect', 'badCombo');

    // Delete the user from the DB
    await User.destroy({id: user.id});

    // Clear the userId from this session.
    delete this.req.session.userId;

    return exits.success();

  }


};
