const { Router } = require('express');

const v1router = require('./v1/router');

const router = Router();
const allowedMethods = Object.freeze([ 'GET' ]);

// Adding headers
router.use(( req, res, next ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if ( req.method === 'OPTIONS' ) {
    res.header( 'Access-Control-Allow-Methods', allowedMethods.toString() );
    return res.status( 200 ).json({ });
  }

  next();
});

// Handling known routes
router.use( '/v1', v1router );

// Handling unknown routes
router.use(( req, res, next ) => {
  const error = new Error();

  if ( !allowedMethods.includes( req.method ) ) {
    error.message = 'Request method not allowed.';
    error.status = 405;
  } else {
    error.message = 'Endpoint not found.';
    error.status = 404;
  }

  next( error );
});

// Handling errors
router.use(( err, req, res, next ) => {
  if ( Object.prototype.isPrototypeOf.call( Error.prototype, err ) ) {
    return res.status( err.status || 500 ).json({ error: err.message });
  }

  console.error('~~~ Unexpected error exception start ~~~')
  console.error( req );
  console.error( err );
  console.error('~~~ Unexpected error exception end ~~~');

  res.status( 500 ).json({
    error: 'An unexpected error occurred while processing your request.'
  });
});

module.exports = router;
