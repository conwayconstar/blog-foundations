/**
 * invalidToken.js
 */

module.exports = function invalidToken(message) {

  const res = this.res;

  // Set result message
  let result = {
    status: 400,
    // Set custom message if it is passed into the response
    message: message ? message : 'The token provided is invalid.'
  };

  // Send JSON as that's what we want!
  return res.status(result.status).json(result);

};
