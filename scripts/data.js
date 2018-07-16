const roles = [{
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
}];

const testUsers = [{
  firstname: 'Super',
  surname: 'Admin',
  email: 'super@modu.dev',
  password: 'superadminpassword',

}, {
  firstname: 'Admin',
  surname: 'Admin',
  email: 'admin@modu.dev',
  password: 'adminpassword',
  
}, {
  firstname: 'Test',
  surname: 'merchant',
  email: 'merchant@modu.dev',
  password: 'merchantpassword',
  
}, {
  firstname: 'Test',
  surname: 'Customer',
  email: 'customer@modu.dev',
  password: 'customerpassword',
  
}];

module.exports = { roles, testUsers };
