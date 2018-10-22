module.exports = {


  friendlyName: 'Update',


  description: 'Update category.',


  inputs: {

    title: {
      type: 'string',
      required: true,
      unique: true
    },

    description: {
      type: 'string'
    },

    id: {
      type: 'number',
      required: true
    }

  },


  fn: async function (inputs, exits) {
    // Create a new category from the inputted fields
    let updatedCategory = await Category.update({id: inputs.id})
      .set(inputs)
      // Fetch category if created
      .fetch();

    return updatedCategory ? exits.success(updatedCategory) : exits.notFound();

  }


};
