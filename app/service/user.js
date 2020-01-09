// eslint-disable-next-line strict
const Service = require('egg').Service;


class UserService extends Service {
  async find() {
    // 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.query('select * as data from admin_user', '');
    const userTotal = await this.app.mysql.query('SELECT COUNT(*) total FROM admin_user');
    const total = userTotal[0].total;
    return { user, total };
  }
  // 判断用户名密码是否正确
  async checkLogin(u, p) {
    console.log('sql',sql)
    const sql = `SELECT user_name FROM admin_user WHERE user_name=${u} AND password=${p}`;
    const res = await this.app.mysql.query(sql);
    return res;
  }
}

module.exports = UserService;
