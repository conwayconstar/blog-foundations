module.exports = {


  friendlyName: 'Create',


  description: 'Create category.',


  inputs: {

    title: {
      type: 'string',
      required: true,
      unique: true
    },

    description: {
      type: 'string'
    },
    
  },


  fn: async function (inputs, exits) {
    // Create a new category from the inputted fields
    let newCategory = await Category.create(inputs)
      // Fetch category if created
      .fetch();

    return exits.success(newCategory);

  }


};
