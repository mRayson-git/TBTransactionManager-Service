module.exports.verifyToken = (req, res, next) => {
  // Get the auth header value
  const bearerHeader = req.headers.authorization;
  // Check if bearer is undefined
  // eslint-disable-next-line valid-typeof
  if (typeof (bearerHeader) !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[0];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    console.log('No bearer header found');
    res.sendStatus(403);
  }
};
