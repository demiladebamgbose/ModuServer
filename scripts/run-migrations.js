const server = require('./../server/server');
const { roles, testUsers } = require('./data');

const dbDataSource = server.dataSources.db;
const dbModels = server.models;

function populateRoles(cb) {
  dbDataSource.automigrate('Role', (err) => {
    if (err) {
      throw err;
    }

    dbModels.Role.create(roles, (error) => {
      if (error) {
        cb(error);
        return;
      }

      console.log('Roles were created Successfully.');
      cb(null, true);
    });
  });
}

function populateUsers(cb) {
  dbModels.Person.create(testUsers, (err) => {
    if (err) {
      cb(err);
      return;
    }

    console.info('Users created successully');
    cb(null, true);
  });
}

async function roleMapping() {
  try {
    const superAdmin = await dbModels.Person.findOne({ where: { email: 'super@modu.dev' } });
    const admin = await dbModels.Person.findOne({ where: { email: 'admin@modu.dev' } });
    const merchant = await dbModels.Person.findOne({ where: { email: 'merchant@modu.dev' } });
    const customer = await dbModels.Person.findOne({ where: { email: 'customer@modu.dev' } });

    const superRole = await dbModels.Role.findOne({ where: { name: 'super' } });
    const adminRole = await dbModels.Role.findOne({ where: { name: 'admin' } });
    const customerRole = await dbModels.Role.findOne({ where: { name: 'customer' } });
    const merchantRole = await dbModels.Role.findOne({ where: { name: 'merchant' } });

    await superRole.principals.create({
      principalType: dbModels.RoleMapping.USER,
      principalId: superAdmin.id,
    });
    await adminRole.principals.create({
      principalType: dbModels.RoleMapping.USER,
      principalId: admin.id,
    });
    await customerRole.principals.create({
      principalType: dbModels.RoleMapping.USER,
      principalId: customer.id,
    });
    await merchantRole.principals.create({
      principalType: dbModels.RoleMapping.USER,
      principalId: merchant.id,
    });
  } catch (err) {
    console.error(err);
  }
}

dbDataSource.automigrate().then(() => {
  // eslint-disable-next-line
  populateRoles((res) => {
    populateUsers(async () => {
      console.info('Migrations completed');

      try {
        await roleMapping();
        dbDataSource.disconnect();
      } catch (err) {
        console.error(err);
      }
    });
  });
}).catch((err) => {
  // eslint-disable-next-line
  console.error(err);
  throw err;
});
