/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝

  // User API endpoints
  'POST  /api/v1/user/create': { action: 'user/create' },
  'PUT  /api/v1/user/update': { action: 'user/update' },
  'DELETE  /api/v1/user/delete': { action: 'user/delete' },

  'PUT  /api/v1/user/login': { action: 'user/login' },
  'GET  /api/v1/user/logout': { action: 'user/logout' },
  'GET /api/v1/user/check': { action: 'user/check' },

  // Post API endpoints
  'POST  /api/v1/post/create': { action: 'post/create' },
  'PUT  /api/v1/post/update': { action: 'post/update' },
  'DELETE  /api/v1/post/delete': { action: 'post/delete' },
  
  'GET /api/v1/post/all' : { action: 'post/all'},
  'GET /api/v1/post/get' : { action: 'post/get'},


  // Category API endpoints
  'POST  /api/v1/category/create': { action: 'category/create' },
  'PUT  /api/v1/category/update': { action: 'category/update' },
  'DELETE  /api/v1/category/delete': { action: 'category/delete' },

  // Email API Endpoints
  "GET /api/v1/email/verify" : { action: "email/verify"}

  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
