const server = require('./../server/server');

const dbDataSource = server.dataSources.db;

dbDataSource.automigrate().then(() => {
  // eslint-disable-next-line
  console.info('Migrations completed');
  dbDataSource.disconnect();
}).catch((err) => {
  // eslint-disable-next-line
  console.error(err);
  throw err;
});
