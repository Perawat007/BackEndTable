const db = require('../util/database');

module.exports = class User {
  constructor(email, password, role) {
    this.email = email;
    this.password = password;
    this.role = role;
  }

  static find(email) {
    return db.execute('SELECT * FROM admindata WHERE email = ?', [email]);
  }

  static findAgent(username) {
    console.log(username);
    return db.execute('SELECT * FROM agentdata WHERE username = ?', [username]);
  }

  static findUser(email) {
    return db.execute('SELECT * FROM userdata WHERE email = ?', [email]);
  }

  static save(user) {
    return db.execute(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
      [user.email, user.password, user.role]
    );
  }
};