/**
 * emailNotUnique.js
 */

module.exports = function emailNotUnique(message) {

  const res = this.res;

  // Set result message
  let result = {
    status: 409,
    // Set custom message if it is passed into the response
    message: message ? message : 'The email address provided is already in use.'
  };

  // Send JSON as that's what we want!
  return res.status(result.status).json(result);

};
