module.exports = function (Person) {
  // accessible to anyone
  Person.signUp = async function (data) {
    let tx;

    try {
      tx = await Person.beginTransaction({});
      const opts = { transaction: tx };
      const customer = await Person.create(data, opts);

      // get the customer role instance
      const role = await Person.app.models.Role.findOne({ where: { name: 'customer' } });

      // assign the user to the customer role
      await role.principals.create({
        principalType: Person.app.models.RoleMapping.USER,
        principalId: customer.id,
      }, opts);

      tx.commit();
      return customer;
    } catch (err) {
      tx.rollback();
      return err;
    }
  };

  Person.remoteMethod('signUp', {
    accepts: {
      arg: 'data',
      type: 'Person',
      description: 'User details for the new user (going to be assigned to the customer role)',
      http: { source: 'body' },
      required: true,
    },
    http: {
      verb: 'post',
    },
    returns: { arg: 'data', type: 'object', root: true },
  });

  // accessible to only super users
  Person.addAdmin = async function (data) {
    let tx;

    try {
      tx = await Person.beginTransaction({});
      const opts = { transaction: tx };
      const admin = await Person.create(data, opts);

      // get the admin role instance
      const role = await Person.app.models.Role.findOne({ where: { name: 'admin' } });

      // assign the user to the admin role
      await role.principals.create({
        principalType: Person.app.models.RoleMapping.USER,
        principalId: admin.id,
      }, opts);
      tx.commit();
      return admin;
    } catch (err) {
      tx.rollback();
      return err;
    }
  };

  Person.remoteMethod('addAdmin', {
    accepts: {
      arg: 'data',
      type: 'Person',
      description: 'User details for the new admin user',
      http: { source: 'body' },
      required: true,
    },
    http: {
      verb: 'post',
    },
    returns: { arg: 'data', type: 'object', root: true },
  });

  // accessible to only admin users
  Person.addMerchant = async function (data) {
    let tx;

    try {
      tx = await Person.beginTransaction({});
      const opts = { transaction: tx };
      const merchant = await Person.create(data, opts);

      // get the merchant role instance
      const role = await Person.app.models.Role.findOne({ where: { name: 'merchant' } });

      // assign the user to the merchant role
      await role.principals.create({
        principalType: Person.app.models.RoleMapping.USER,
        principalId: merchant.id,
      }, opts);
      tx.commit();
      return merchant;
    } catch (err) {
      tx.rollback();
      return err;
    }
  };

  Person.remoteMethod('addMerchant', {
    accepts: {
      arg: 'data',
      type: 'Person',
      description: 'User details for the new merchant user',
      http: { source: 'body' },
      required: true,
    },
    http: {
      verb: 'post',
    },
    returns: { arg: 'data', type: 'object', root: true },
  });

  Person.prototype.hasRole = async function (roleName) {
    const { id } = this;
    const { Role, RoleMapping } = Person.app.models;
    let role;
    let roles;

    try {
      role = await Role.findOne({ where: { name: roleName } });
    } catch (err) {
      throw err;
    }

    if (!role) {
      return false;
    }

    try {
      roles = await Role.getRoles({ principalType: RoleMapping.USER, principalId: id });
    } catch (err) {
      throw err;
    }

    return roles.includes(role.toJSON().id);
  };

  Person.remoteMethod('hasRole', {
    isStatic: false,
    accepts: {
      arg: 'roleName',
      type: 'string',
      required: true,
    },
    http: {
      verb: 'post',
    },
    returns: { arg: 'data', type: 'Boolean', root: true },
  });
};
