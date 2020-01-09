'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async article() {
    const ctx = this.ctx;
    const findArticleList = await ctx.service.article.find();
    ctx.body = findArticleList;
  }
  async userInfo() {
    const ctx = this.ctx;
    const { user, total } = await ctx.service.user.find();
    ctx.body = {
      code: 0,
      message: '操作成功',
      data: {
        user,
        total,
      },
    };
  }
  async getArticleById() {
    // 先配置路由的动态传值，然后再接收值
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.id ' +
      'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    await this.app.mysql.update('article',{view_count:result[0].view_count ++ },{
      where: {
        id: id
      }
    });
    this.ctx.body = { data: result };
  }
  // 得到类别名称和编号
  async getTypeInfo() {
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };

  }
}

module.exports = HomeController;
