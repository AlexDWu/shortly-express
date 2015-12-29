var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var hashAsync = Promise.promisify(bcrypt.hash);

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: false,
  initialize: function(){
    this.on('creating', function(model,attrs,options){
      var password = model.get('password');
      return hashAsync(password, null, null)
      .then( function(hash) {
        //Store password into DB
        model.set('password', hash);
      })
      .catch(function(error){
        throw error;
      });
    });
  },
});

module.exports = User;