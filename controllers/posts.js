const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Post = require('../models/post');
const db = require('../util/database');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allPosts] = await Post.fetchAll();
    res.status(200).json({status:'getData', allPosts});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const [onePost] = await Post.oneGet(req.params.id);
    res.status(200).json(onePost);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postPost = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const post = {
      email: email,
      password: hashedPassword,
      role: role,
    };
    if (post.email !== '@')
    {
      const result = await Post.save(post);
      res.status(201).json({ status:'Create Succeed', message: 'Create Succeed' });
    }
    else
    {
      res.status(200).json({ status:'กรุณากรอกข้อมูลให้ถูกต้อง', message: 'กรุณากรอกข้อมูลให้ถูกต้อง' });
    }
   
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const deleteResponse = await Post.delete(req.params.id);
    res.status(200).json({status:'Delete Succeed' , message: 'Delete Succeed' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.putPost = async (req, res, next) => {
  const id = req.params.id;
  const email = req.body.email;
  try {
    const post = {
      id:id,
      email: email
    };
    const update = await Post.put(post);
    res.status(200).json({status:'Update Succeed' , message: 'Update Succeed' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putPostAgent = async (req, res, next) => {
  const id = req.params.id;
  const username = req.body.username;
  const active = req.body.active;
  try {
    const post = {
      id:id,
      username: username,
      active: active
    };
    const update = await Post.putAgent(post);
    res.status(200).json({status:'Update Succeed' , message: 'Update Succeed' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.putPostUser = async (req, res, next) => {
  const id = req.params.id;
  const username = req.body.username;
  const active = req.body.active;
  try {
    const post = {
      id:id,
      username: username,
      active: active
    };
    const update = await Post.putUser(post);
    res.status(200).json({status:'Update Succeed' , message: 'Update Succeed' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postAgent = async (req, res, next) => {
  const role = req.body.role;
  const username = req.body.username;
  const password = req.body.password;
  const active = req.body.active;
  const credit = req.body.credit;
  const adminID = req.body.adminID;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const post = {
      role: role,
      username: username,
      password: hashedPassword,
      active: active,
      credit: credit,
      adminID: adminID
    };
    const result = await Post.saveAgent(post);
    res.status(201).json({ status:'Create Succeed', message: 'Create Succeed' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchAllAgent = async (req, res, next) => {
  try {
    const [allPosts] = await Post.fetchAllAgent();
    res.status(200).json({status:'getDataAgent', allPosts});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOneAgent = async (req, res, next) => {
  try {
    const [onePost] = await Post.oneGetAgent(req.params.id);
    res.status(200).json(onePost);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postUser = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const active = req.body.active;
  const balance = req.body.balance;
  const idCreate = req.body.idCreate;
  const roleCreate = req.body.roleCreate;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const post = {
      username: username,
      password: hashedPassword,
      active: active,
      balance: balance,
      idCreate: idCreate,
      roleCreate: roleCreate
    };
    const result = await Post.saveUser(post);
    res.status(201).json({ status:'Create Succeed', message: 'Create Succeed' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchAllUser = async (req, res, next) => {
  try {
    const [allPosts] = await Post.fetchAllUser();
    res.status(200).json({status:'getDataUser', allPosts});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const [onePost] = await Post.oneGetUser(req.params.id);
    res.status(200).json(onePost);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postBalance = async (req, res, next) => {

  const id = req.params.id;
  const balance = req.body.balance;
  const reqAction = req.body.reqAction;

  try {
    if (reqAction === "deposit")
    {
      const result = await Post.getBalanceUser(id);
      const changeBalance = result[0][0].balance + balance;
      const post = {
        id:id,
        balance:changeBalance
      };
      const resulBalance = await Post.putBalanceUser(post);
      res.status(200).json({status:'ChangeBalance Succeed'});
    }
  
    if (reqAction === "withdraw")
    {
      const result = await Post.getBalanceUser(id);
      if (result[0][0].balance >= balance)
      {
        const changeBalance = result[0][0].balance - balance;
        const post = {
          id:id,
          balance:changeBalance
        };
        const resulBalance = await Post.putBalanceUser(post);
        res.status(200).json({status:'ChangeBalance Succeed'});
      }
      else
      {
        res.status(500).json({status:"The Balance peak was insufficient"});
      }
    }
    else
    {
      res.status(500).json({status:'Cannot Process'});
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.postCredit = async (req, res, next) => {

  const id = req.params.id;
  const num = req.body.credit;
  const reqAction = req.body.reqAction;
  const credit = parseInt(num);
  try {
    if (reqAction === "deposit")
    {
      try {
        const result = await Post.getCredit(id);
        const changeCredit = credit + result[0][0].credit;
        const post = {
        id:id,
        credit:changeCredit
        };
        const resulCredit = await Post.putCredit(post);
        res.status(201).json({status:"ChangeCredit Succeed", message:"ChangeCredit Succeed"});
      } catch (err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      }
      
    }
    if (reqAction === "withdraw")
    {
      const result = await Post.getCredit(id);
      if (result[0][0].credit >= credit)
      {
        const changeCredit = result[0][0].credit - credit;
        const post = {
          id:id,
          credit:changeCredit
        };
        const resulCredit = await Post.putCredit(post);
        res.status(200).json({status:'ChangeCredit Succeed', message:"ChangeCredit Succeed"});
      }
      else
      {
        res.status(500).json({status:"The Credit peak was insufficient"});
      }
    }
    else
    {
      res.status(500).json({status:'Cannot Process'});
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.checkToken = async (req, res, next) => {
};

exports.test = async (req, res, next) => {
  try {
    const [allPosts] = await Post.testGet();
    res.status(200).json({status:'getDataAgent', allPosts});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

