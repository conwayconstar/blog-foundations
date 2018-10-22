module.exports = {


  friendlyName: 'Create',


  description: 'Create post.',


  inputs: {

    title: {
      type: 'string',
      required: true
    },

    content: {
      type: 'string'
    },

    categories: {
      type: 'json'
    }

  },

  fn: async function (inputs, exits) {
    // Create a new post from the inputted fields
    let newPost = await Post.create(
      Object.assign(inputs,
        // Set the posts user as the current user
        {user: this.req.session.userId}))
      // Fetch post if created
      .fetch();
    // Assign categories to the new post
    if(inputs.categories)
      await Post.addToCollection(newPost.id, 'categories', inputs.categories);

    return exits.success(newPost);
  }

};
