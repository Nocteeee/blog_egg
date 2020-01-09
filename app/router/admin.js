// eslint-disable-next-line strict
module.exports = app => {
  const { router, controller } = app;
  const adminAuth = app.middleware.adminAuth();
  router.post('/admin/login', controller.admin.main.login);
  router.get('/admin/getTypeInfo', adminAuth, controller.admin.main.getTypeInfo);
  router.post('/admin/addArticle', adminAuth, controller.admin.main.addArticle);
  router.get('/admin/getArticleList', adminAuth, controller.admin.main.getArticleList);
  router.delete('/admin/delArticle', adminAuth, controller.admin.main.delArticle);
  router.post('/admin/updateArticle', adminAuth, controller.admin.main.updateArticle);
  router.get('/admin/getArticleById/:id',adminAuth,controller.admin.main.getArticleById)
};
