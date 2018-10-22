/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'conway@fullstackedkush.com',
      description: 'Unique valid email address'
    },

    fullName: {
      type: 'string',
      required: true,
      maxLength: 50,
      example : 'Conway Kush',
      description: 'Users full-name'
    },

    password: {
      type: 'string',
      required: true,
      protect: true,
      example: '_[`~(xY([H9}vD`"',
      description: 'Encrypted password'
    },

    isAdmin : {
      type: 'boolean',
      example: true,
      description: 'Declares if the user is an admin'
    },

    passwordResetToken : {
      type: 'string',
      example: 'D3QKeC320SxUi9i2',
      description: 'Password reset token'
    },

    passwordResetTokenExpiry : {
      type: 'number',
      example: 1537027020609,
      description: 'Date when password reset token expires'
    },

    emailVerifyToken : {
      type: 'string',
      example: 'HX2I9xFftfQJfke12dwAQ',
      description: 'Email verification token'
    },

    emailVerifyTokenExpiry : {
      type: 'number',
      example: 1537027020609,
      description: 'Date when email verification token expires'
    },

    emailStatus: {
      type: 'string',
      isIn : ['confirmed', 'unconfirmed', 'newEmail'],
      defaultsTo : 'unconfirmed',
      description: 'Status of users email'
    },

    emailRequested: {
      type: 'string',
      isEmail: true,
      maxLength: 200,
      example: 'conway@fullstackedkush.com',
      description: 'Email that has been requested by the user '
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    posts: {
      collection: 'post',
      via: 'user'
    },
  }

};

