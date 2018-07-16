module.exports = function (app) {
  const { Person, Poi, Role } = app.models;

/**
 * Role resolver for checking if the user making the request is the merchant for the poi
 * 
 * @param {any} role
 * @param {any} ctx
 * @param {function} cb
 */
  Role.registerResolver('$merchantPoi', async (role, ctx, cb) => {
    if (ctx.modelName !== 'Poi') {
      callback(null, false);
      return;
    }

    const poiId = parseInt(ctx.modelId, 10);
    const merchantId = context.accessToken && context.accessToken.userId;

    if (!userId) {
      cb(null, false);
    } else {
      // find the poi in question
      Poi.findById(poiId).then((poi) => {
        // find the merchants for the poi
        return poi.merchants.findById(merchantId);
      }).then((merchant) => {
        if (merchant) {
          // if merchant exists then return true
          cb(null, true);
        } else {
          // if merchant doesn't exist, the user is unautorised to continue
          cb(null, false);
        }
      }).catch((err) => {
        cb(err);
      });
    }
  });
};
