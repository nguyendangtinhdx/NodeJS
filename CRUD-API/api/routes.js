'use strict';
module.exports = function(app) {
  var usersCtrl = require('./controllers/UsersController');

  // todoList Routes
  app.route('/api/users')
    .get(usersCtrl.get)
    .post(usersCtrl.insert);


  app.route('/api/users/:userId')
    .get(usersCtrl.detail)
    .put(usersCtrl.update)
    .delete(usersCtrl.delete);
};
