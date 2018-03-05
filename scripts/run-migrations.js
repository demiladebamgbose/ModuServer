const server = require('./../server/server');

const dbDataSource = server.dataSources.db;
const dbModels = server.models;

function populateRoles(cb) {
  dbDataSource.automigrate('Role', (err) => {
    if (err) {
      throw err;
    }

    dbModels.Role.create([{
      name: 'super',
      description: 'Is not restricted to anything.',
    }, {
      name: 'admin',
      description: 'Can add other merchants and do some things merchants can do.',
    }, {
      name: 'merchant',
      description: 'Manages his business on the platform.',
    }, {
      name: 'customer',
      description: 'Customer',
    }], (error) => {
      if (error) {
        throw error;
      }

      console.log('Roles were created Successfully.');
      cb(true, null);
    });
  });
}

dbDataSource.automigrate().then(() => {
  // eslint-disable-next-line
  populateRoles((res) => {
    console.info('Migrations completed');
    dbDataSource.disconnect();
  });
}).catch((err) => {
  // eslint-disable-next-line
  console.error(err);
  throw err;
});
