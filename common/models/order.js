module.exports = function(Order) {
  Order.beforeRemote('create', function(context, user, next) {
    var req = context.req;
    req.body.pickupAt = Date.now()+1000;
    req.body.createdAt = Date.now()-1000;
    req.body.deliverAt = Date.now()+2000;
    req.body.status = "created";
    // req.body.createdBy = req.accessToken.userId;
    next();
  });
};
