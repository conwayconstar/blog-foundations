module.exports = {


  friendlyName: 'get',


  description: 'Get post.',


  inputs: {
    id: {
      type: 'number',
      required: true
    },
  },

  exits: {
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },

  fn: async function (inputs, exits) {
    // Find one of the post
    const post = await Post.findOne(inputs);
    // If the post is not found exit notFound
    if (!post)
      return exits.notFound();
    // Waterline does not yet support selecting
    // values in singular model associations.
    // this is looping through and removing user properties
    ['password',
      'passwordResetTokenExpiry',
      'passwordResetToken',
      'emailVerifyToken',
      'emailVerifyTokenExpiry',
      'emailStatus'].forEach(e => delete post.user[e]);
    // Send post into the response
    return exits.success(post);
  }

};
