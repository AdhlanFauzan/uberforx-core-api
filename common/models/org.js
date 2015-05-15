module.exports = function(Org) {
  Org.status = function(cb) {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var OPEN_HOUR = 6;
    var CLOSE_HOUR = 20;

    console.log('Current hour is ' + currentHour);

    var response;
    if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
      response = 'We are open for business.';
    } else {
      response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
    }
    cb(null, response);
  };

  Org.remoteMethod(
    'status',
    {
      http: {path: '/status', verb: 'get'},
      returns: {arg: 'status', type: 'string'}
    }
  );

    Org.getDrivers = function(cb) {

    var response;

    // //Query for drivers
    // if (error) {
    //   response = 'error';
    // } else {
    //   response = 'success';
    // }
    cb(null, response);
  };

  Org.remoteMethod(
    'status',
    {
      http: {path: '/getDrivers', verb: 'get'},
      returns: {arg: 'status', type: 'string'}
    }
  );
};
