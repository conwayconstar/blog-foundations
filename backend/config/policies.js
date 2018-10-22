/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  // User has to be logged in to access user routes.
  'user/*': 'isLoggedIn',
  // Other than the bellow
  'user/login' : true,
  'user/logout' : true,
  'user/check' : true,
  'user/create' : true,

};
