module.exports = {


  friendlyName: 'Logout',


  description: 'Logout user.',


  fn: async function (inputs, exits) {

    // Clear the userId from this session.
    delete this.req.session.userId;

    return exits.success();

  }


};
