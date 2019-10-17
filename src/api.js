const { Router } = require('express');

const v1router = require('./v1/router');

const router = Router();
const allowedMethods = Object.freeze([ 'GET' ]);

// Adding headers
router.use(( req, res, next ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Cache-Control', 'public, max-age=60, s-maxage=60' );
  res.header( 'Content-Security-Policy', "default-src 'none'" );
  res.header( 'Vary', 'Accept, Accept-Encoding' );
  res.header( 'Referrer-Policy', 'origin-when-cross-origin, strict-origin-when-cross-origin' );
  res.header( 'X-XSS-Protection', '1; mode=block' );
  res.header( 'X-Content-Type-Options', 'nosniff' );
  res.header( 'X-Frame-Options', 'deny' );

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
