const {
  retrieveIssuesFrom,
  retrieveAllIssuesFrom,
  parseLink
} = require('../services/github');

const index = async ( account, repo ) => {
  const { headers, data: firstRetrievedData } = await retrieveIssuesFrom( account, repo, 1 );

  const { link } = headers;

  const parsedLinks = parseLink( link );

  const lastLink = parsedLinks.find( l => l.key === 'last' );

  const pagesToFetch =
    +lastLink.value.substring( lastLink.value.lastIndexOf('=') + 1, lastLink.value.length );

  const results = await retrieveAllIssuesFrom( account, repo, pagesToFetch );

  const remainingRetrievedData = results
    .map( ({ data }) => data.filter(d => !d.pull_request) )
    .reduce( (acc, cur) => acc.concat(cur), [] );

  const issues = new Array(0)
    .concat( firstRetrievedData, remainingRetrievedData )
    .filter( d => !d.pull_request )
    .map( ({ title, html_url, created_at, labels }) => ({
        title,
        html_url,
        created_at,
        labels: labels.map( ({ name, color }) => ({ name, color }) )
      })
    );

  return Promise.resolve()
    .then(() => ({
        status: 200,
        issues
      })
    );
}

const show = async ( account, repo, issuePage ) => {
  const { data } = await retrieveIssuesFrom( account, repo, issuePage );

  const issues = data
    .filter( d => !d.pull_request )
    .map( ({ title, html_url, created_at, labels }) => ({
        title,
        html_url,
        created_at,
        labels: labels.map( ({ name, color }) => ({ name, color }) )
      })
    );

  return Promise.resolve()
    .then(() => ({
        status: 200,
        issues
      })
    );
}

module.exports = {
  index,
  show
};
