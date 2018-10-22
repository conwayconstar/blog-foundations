module.exports = {


  friendlyName: 'Delete',


  description: 'Delete post.',


  inputs: {

    id: {
      type: 'number',
      required: true
    }

  },

  fn: async function (inputs, exits) {

    // Delete the post from the DB
    await Post.destroy({id: inputs.id});

    return exits.success();

  }


};
