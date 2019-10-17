const { Router } = require('express');

const {
  index,
  show
} = require('./controllers/github');

const router = Router();

const controllerHandler = ( promise, params ) => async ( req, res, next ) => {
  const boundParams = params ? params( req, res, next ) : [];

  try {
    const { status, data } = await promise( ...boundParams );

    return res.status( status || 200 ).json( data );
  }
  catch ( error ) {
    return next( error );
  }
};

router.get(
  '/github/:account/:repo',
  controllerHandler( index, (req, res, next) => [ req.params.account, req.params.repo] )
);

router.get(
  '/github/:account/:repo/:issuePage',
  controllerHandler( show, (req, res, next) => [ req.params.account, req.params.repo, +req.params.issuePage ] )
);

module.exports = router;
