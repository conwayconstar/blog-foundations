module.exports = {


  friendlyName: 'Delete',


  description: 'Delete category.',


  inputs: {

    id: {
      type: 'number',
      required: true
    }

  },


  fn: async function (inputs, exits) {
    // Delete the category from the DB
    await Category.destroy({id: inputs.id});

    return exits.success();

  }


};
