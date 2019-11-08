export const environment = {
  production: true,
  redisServer: 'wss://redis-patterns-server.ac01.acadevmy.it',
  githubEndpoint: 'https://api.github.com/repos/_repo_/contents/_file_',
  redisDocRepo: {
    path: 'antirez/redis-doc',
    json: 'commands.json',
    doc: 'commands/_file.md'
  },
  patternsRepo: {
    path: 'acadevmy/redis-patterns-cookbook',
    json: 'patterns.json'
  },
  cacheableHeaderKey: 'cacheable-request'
};
