'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async login() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    // 首页的文章列表数据
    const sql = `SELECT user_name FROM admin_user WHERE user_name='${userName}' AND password='${password}'`;
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      // 登录成功,进行session缓存
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId } ;
      console.log(this.ctx.session.openId)
      this.ctx.body = { data: '登录成功', openId };
    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }
  //后台文章分类信息
  async getTypeInfo(){
    console.log('getTypeInfo',this.ctx.session.openId)
    const resType = await this.app.mysql.select('type');
    this.ctx.body={data:resType}
  }
  //添加文章
  async addArticle(){
    let tmpArticle= this.ctx.request.body;
    const result = await this.app.mysql.insert('article',tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body={
      isScuccess:insertSuccess,
      insertId:insertId
    }
  }
  //获取文章列表
  async getArticleList (){
    let pageSize = this.ctx.query.pageSize || 10;
    let pageNo = this.ctx.query.pageNo || 1;
    const sql = "SELECT article.id as id, " +
          "article.type_id as type_id," +
          "article.title as title," +
          "article.introduce as introduce," +
          "article.view_count as view_count,"+
          "FROM_UNIXTIME( article.addTime,'%Y-%m-%d' ) as addTime,"+
          "type.typeName as typeName " +
          "FROM article LEFT JOIN type ON article.type_id = type.orderNum " +
          "ORDER BY article.addTime desc " +
          "LIMIT " + pageSize + " OFFSET " + (pageSize * (pageNo - 1));
    const count_sql = `SELECT count(*) total FROM article`;
    const articleList = await this.app.mysql.query(sql);
    const total = await this.app.mysql.query(count_sql);
    this.ctx.body={
      data:articleList,
      total:total[0].total
    }
  }
  //删除文章
  async delArticle(){
    const id = this.ctx.query.id;
    const result = await this.app.mysql.delete('article',{id:id});
    this.ctx.body = {
      code:result.status
    }
  }
  //根据文章ID得到文章详情，用于修改文章
  async getArticleById(){
    let id = this.ctx.params.id;

    let sql = 'SELECT article.id as id,'+
      'article.title as title,'+
      'article.introduce as introduce,'+
      'article.article_content as article_content,'+
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
      'article.view_count as view_count ,'+
      'type.typeName as typeName ,'+
      'type.id as typeId '+
      'FROM article LEFT JOIN type ON article.type_id = type.Id '+
      'WHERE article.id='+id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body={data:result}
  }
  //修改文章
  async updateArticle(){
    let tmpArticle= this.ctx.request.body;
    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body={
      isScuccess:updateSuccess
    }
  }
}

module.exports = MainController;
