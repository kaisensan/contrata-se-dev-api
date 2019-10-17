const axios = require('axios');

const composeUrl = ( account, repo, issuePage ) =>
  `https://api.github.com/repos/${account}/${repo}/issues?state=open&page=${issuePage}`;

const parseLink = link =>
  link.split(',')
    .map( keyValueGroup => keyValueGroup.split(';') )
    .map( keyValue => ({
        key: keyValue[1].match(/rel="(.+)"/)[1],
        value: keyValue[0].match(/<(.+)>/)[1]
      })
    );

const retrieveIssuesFrom = ( account, repo, issuePage ) => {
  return axios.get( composeUrl( account, repo, issuePage ) );
}

const retrieveAllIssuesFrom = ( account, repo, issuePages ) => {
  const promisedPages = [];

  for ( let i = 2; i <= issuePages; i++ ) {
    promisedPages.push( axios.get( composeUrl( account, repo, i ) ) );
  }

  return Promise.all( promisedPages );
}

module.exports = {
  composeUrl,
  parseLink,
  retrieveIssuesFrom,
  retrieveAllIssuesFrom
}
