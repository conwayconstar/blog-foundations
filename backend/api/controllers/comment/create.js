module.exports = {


  friendlyName: 'Create',


  description: 'Create comment.',


  inputs: {

    content: {
      type: 'string',
      required: true,
    },

    username: {
      type: 'string',
    },

    email: {
      type: 'string',
      isEmail: true
    },

    post: {
      type: 'number',
      required: true
    }

  },


  exits: {

    noUser: {
      statusCode: 401,
      description: 'There is no user attached to the comment'
    }

  },


  fn: async function (inputs, exits) {

    if(this.req.session.userId)
    // Check if the user is signed in and assign them to the comment
      inputs = Object.assign(inputs, {user : this.req.session.userId})
    else if(inputs.email && inputs.username)
      // if the user is not signed in check if they have added their details
      inputs = Object.assign(inputs,
        {email : inputs.email },
        {username : inputs.username });
    // Throw user if none can be found
    else  throw 'noUser';

    // Create comment from the inputted fields
    let newComment = await Comment.create(Object.assign(inputs, {
      post: inputs.post
    }))
      // Fetch comment if created
      .fetch();

    return exits.success(newComment);

  }

};
