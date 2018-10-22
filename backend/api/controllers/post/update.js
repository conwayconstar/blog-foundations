module.exports = {


  friendlyName: 'Update',


  description: 'Update post.',


  inputs: {

    title: {
      type: 'string',
      required: true,
      unique: true
    },

    content: {
      type: 'string'
    },

    id: {
      type: 'number',
      required: true
    },

    categories: {
      type: 'json'
    }

  },


  fn: async function (inputs, exits) {

    // Update the post in the DB
    let updatedPost = await Post.update({id: inputs.id}).set({
      title: inputs.title,
      content: inputs.content
    })
      // Fetch post if updated
      .fetch();

    if (inputs.categories)
      await Post.replaceCollection(updatedPost.id, 'categories', inputs.categories);

    // Return the updated post, or if it isn't found return 404
    return updatedPost ? exits.success(updatedPost) : exits.notFound();

  }


};
