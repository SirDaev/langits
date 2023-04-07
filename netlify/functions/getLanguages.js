import { graphql } from '@octokit/graphql';

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: "bearer " + process.env.GIT_CLASSIC_TOKEN,
  },
});

async function fetchData(q) {
  return await graphqlWithAuth(q);
}

function filterCombineSortLangs(repos) {
  let langsList = [];
  let runningTotal = 0;

  repos.forEach(repo => {
    repo.node.languages.edges.forEach(lang => {
      runningTotal += lang.size;

      const langExistsIndex = langsList.findIndex(lwd => {
        return lwd.name === lang.node.name;
      })

      if(langExistsIndex === -1) {
        langsList.push({
          "name": lang.node.name,
          "color": lang.node.color,
          "sizeInBytes": lang.size
        });
      } else {
        const hitIndex = langsList.findIndex(l => {
          return lang.node.name === l.name;
        });
  
        langsList[hitIndex].sizeInBytes += lang.size;
      }


    });
  });

  const langsListWithPercents = langsList.map(lang => {
    return (
      {
        ...lang,
        "percent": ((lang.sizeInBytes/runningTotal)*100).toFixed(2)
      }
    )
  });

  const sortedLangs = langsListWithPercents.sort((a, b) => b.percent-a.percent)

  return sortedLangs;
}

export async function handler (event, context) {

  const user = JSON.parse(event.body).username;
  
  const query = `
    {
      repositoryOwner(login: "${user}") {
        repositories(first: 100, isFork: false) {
          edges {
            node {
              name
              languages(first: 50) {
                edges {
                  node {
                    id
                    name
                    color
                  }
                  size
                }
              }
            }
          }
        }
      }
      rateLimit {
        limit
        cost
        remaining
        resetAt
      }
    }
  `

  const data = await fetchData(query);
  const repos = data.repositoryOwner.repositories.edges;

  return {
    statusCode: 200,
    body: JSON.stringify({
      "user": user,
      "numberOfRepos": repos.length,
      // "repos": repos,
      // "rateLimit": data.rateLimit,
      "langs": filterCombineSortLangs(repos)
    }, null, 2)
  };
}