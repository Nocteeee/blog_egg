// eslint-disable-next-line strict
module.exports = app => {
  const { router, controller } = app;
  router.get('/default/article', controller.default.home.article);
  router.get('/default/userInfo', controller.default.home.userInfo);
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById);
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo);
};
