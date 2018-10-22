/**
 * emailNotUnique.js
 */

module.exports = function inexistentUser(message) {

  const res = this.res;

  // Set result message
  let result = {
    status: 401,
    // Set custom message if it is passed into the response
    message: message ? message : 'The details provided does not match any user registered.'
  };

  // Send JSON as that's what we want!
  return res.status(result.status).json(result);

};
