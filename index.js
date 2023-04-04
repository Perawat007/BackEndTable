/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const { request } = require('express');

const app = express();

app.use(cors());
app.use(bodyParser.json());

//connect Mysql Database
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'admintest',
    port:3306
})

// check database connection
db.connect(err =>{
    if(err)
    {
        console.log('error')
    }
    console.log('Database Connected Successful!!!')
})


//get All data
app.get('/admindata',(req,res)=>{
    //console.log('Get All USers');
    let qrr = `SELECT * FROM admindata`;
    db.query(qrr,(err,results) =>{
        if (err){
            console.log(err,'error')
        }
        if (results.length>0){
            const [data] = results
            res.send({
                message: 'All users Data',
                res.status(200).json(data);
            });
        };
    });
});

//get one data
app.get('/admindata/:id',(req,res)=>{
    //console.log(req.params.id);
    let qrId = req.params.id;
    let qr = `SELECT * FROM admindata where id = ${qrId}`;
    db.query(qr,(err,results) =>{
        if (err){
            console.log(err)
        }
        if (results.length>0){
            res.send({
                message: 'Get Data By Id',
                data:results
            });
        }else{
            res.send({
                message:"Data not found dear"
            })
        }
    });
});

//post data
app.post('/admindata',(req,res)=>{
    //console.log(req.body, 'Post data success')
    let Email = req.body.email;
    let Password = req.body.password;
    let Role = req.body.role;

    let qr = `insert into admindata(email,password,role)
    value('${Email}','${Password}','${Role}')`;
    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
        res.send({
            message:"Data created Success",
            data:results
        });
    })
})

//Update data
app.put('/admindata/:id',(req,res)=>{
    let uID = req.params.id;
    let Email = req.body.email;
    let Password = req.body.password;
    let Role = req.body.role;

    let qr = `update admindata set email = '${Email}', 
    password = '${Password}', role = '${Role}' where id = '${uID}'`;
    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
        res.send({
            message:"Data Update Success",
            data:results
        });
    })
});

//Delete data 
app.delete('/admindata/:id',(req,res)=>{
    let uID = req.params.id;
    let qr = `delete from admindata where id = '${uID}'`;
    db.query(qr,(err,results)=>{
        if(err){console.log(err)}
        res.send({
            message:"Data Delete Success",
        });
    })
});

//เช็คการเชื่อมต่อ
app.listen(3000, ()=>{
    console.log("Server is runing on 3000 PORT...");
})*/

const express = require('express');

const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');

const postsRoutes = require('./routes/posts');

const errorController = require('./controllers/error');

const cors = require('cors');

const app = express();

const ports = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, X-Custom-Header, Authorization'
  );
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use('/auth', authRoutes);

app.use('/post', postsRoutes);

app.use(errorController.get404);

app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on port... ${ports}`));

httpsServer.listen(ports);