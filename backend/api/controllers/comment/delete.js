module.exports = {


  friendlyName: 'Delete',


  description: 'Delete comment.',


  inputs: {

    id: {
      type: 'number',
      required: true
    }

  },

  fn: async function (inputs, exits) {

    // Delete the comment from the DB
    await Comment.destroy({id: inputs.id});

    return exits.success();

  }


};
