const db = require('../util/database');

module.exports = class Post {
  constructor(email, password, role) {
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static fetchAll() {
    return db.execute('SELECT * FROM admindata');
  }

  static oneGet(id){
    return db.execute(`SELECT * FROM admindata where id = ${id}`);
  }

  static save(post) {
    return db.execute(
      'INSERT INTO admindata (email, password, role) VALUES (?, ?, ?)',
      [post.email, post.password, post.role]
    );
  }

  static delete(id) {
    return db.execute('DELETE FROM admindata WHERE id = ?', [id]);
  }

  static put(dataPost){
    return db.execute(
      `UPDATE admindata set email = '${dataPost.email}' where id = ?`,[dataPost.id])
  }

  static saveAgent(post) {
    return db.execute(
      'INSERT INTO agentdata (role, username, password, active, credit, adminID) VALUES (?, ?, ?, ?, ?, ?)',
      [post.role, post.username, post.password, post.active, post.credit, post.adminID]
    );
  }

  static fetchAllAgent() {
    return db.execute('SELECT * FROM agentdata');
  }

  static oneGetAgent(id){
    return db.execute(`SELECT * FROM agentdata where id = ${id}`);
  }

  static putAgent(dataPost){
    return db.execute(
      `UPDATE agentdata set username = '${dataPost.username}', active = '${dataPost.active}' where id = ?`,[dataPost.id])
  }

  static putUser(dataPost){
    return db.execute(
      `UPDATE userdata set username = '${dataPost.username}', active = '${dataPost.active}' where id = ?`,[dataPost.id])
  }

  static getCredit(id){
    return db.execute(`SELECT credit FROM agentdata where id = ${id}`);
  }

  static putCredit(data){
    return db.execute(
      `UPDATE agentdata set credit = '${data.credit}' where id = ?`,[data.id])
  }

  static saveUser(post) {
    return db.execute(
      'INSERT INTO userdata (username, password, active, balance, idCreate, roleCreate) VALUES (?, ?, ?, ?, ?, ?)',
      [post.username, post.password, post.active, post.balance, post.idCreate, post.roleCreate]
    );
  }

  static fetchAllUser() {
    return db.execute('SELECT * FROM userdata');
  }

  static oneGetUser(id){
    return db.execute(`SELECT * FROM userdata where id = ${id}`);
  }

  static getBalanceUser(id){
    return db.execute(`SELECT balance FROM userdata where id = ${id}`);
  }

  static putBalanceUser(data){
    return db.execute(
      `UPDATE userdata set balance = '${data.balance}' where id = ?`,[data.id])
  }

  static testGet()
  {
    return db.execute('SELECT * FROM `admindata`');
  }
};

