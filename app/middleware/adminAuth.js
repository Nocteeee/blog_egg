// eslint-disable-next-line strict,no-unused-vars
module.exports = options => {
  return async function adminAuth(ctx, next) {
    await next();
    // console.log('adminAuth',ctx.session.openId)
    // if (ctx.session.openId) {
    //   await next();
    // } else {
    //   ctx.body = { data: '没有登录',code:401 };
    // }
  };
};
