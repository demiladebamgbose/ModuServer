module.exports = function (PersonFollow) {
  async function beforeSave(ctx, next) {
    const data = ctx.instance || ctx.data;
    const existingData = await PersonFollow.findOne({
      where: {
        and: [{ requesterId: data.requesteeId }, { requesteeId: data.requesterId }],
      },
    });

    if (!existingData) {
      return next();
    }

    throw (new Error('data exists in the database'));
  }

  PersonFollow.observe('before save', beforeSave);
};
