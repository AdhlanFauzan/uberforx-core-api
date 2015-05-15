module.exports = function(User) {


  //Disable Endpoints not being used
  var isStatic = true;
  User.disableRemoteMethod('deleteById', isStatic);
  User.disableRemoteMethod('findOne', isStatic);

};
