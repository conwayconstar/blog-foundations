module.exports = {


  friendlyName: 'all',


  description: 'Fetch all post.',


  fn: async function (inputs, exits) {
    // Find all posts and populate the user field
    const posts = await Post.find()
      .populate('user');
    // Waterline does not yet support selecting
    // values in singular model associations.
    // this is looping through and removing user properties
    posts.forEach(post => [
      'password',
      'passwordResetTokenExpiry',
      'passwordResetToken',
      'emailVerifyToken',
      'emailVerifyTokenExpiry',
      'emailStatus'
    ].forEach(e => delete post.user[e]));
    // Send found posts
    return exits.success(posts);
  }

};
