//express
const express = require('express');
const app = express();

//req.header
const cookieParser = require('cookie-parser');
//req.query
const bodyParser = require('body-parser');

//view engine
const cors = require('cors');

//config
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


//SQL
const connectionString = "postgres://peodzzpi:Bt26r3XYTIzcb09VlwSuYxHK_O8HzUkb@isilo.db.elephantsql.com:5432/peodzzpi";
const { Pool } = require('pg')
const pool = new Pool ({
    connectionString: connectionString,
})


//file system usage: readfile / writefile
const fs = require('fs')
var path = require('path');

//Network monitor
const logger = require('morgan');
const e = require('express');

// fs write file
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(logger('dev', {stream: accessLogStream}));

// Error Handling
// app.use((err) => {
//     console.log(err);
//     res.status(500);
//     res.send("Error");
// })

// app.method('/params', function())
//if(Method === 'GET' && params === "about") {}

app.get('/', async (req, res) => {

    //promise (use await async) SQL query
     const result = await pool.query("SELECT * FROM test ORDER BY id ASC" );
     // SELECT name FROM test; get Colume name

     res.send(result.rows);

    //  pool.query("SELECT * FROM test" , (err, res) => {
    //     console.log(res.rows);
    //   })
})

app.post('/post', (req, res) => {
    //get request data: req.query / req.body / req.params
    const q = req.body;
    console.log(req.query);
    console.log(req.params)
    console.log(req.body)

    //SQL post query , Structure: pool.query('query', [value1, value 2,...] , function());
    pool.query(`INSERT INTO test (name, email, msg) VALUES ($1, $2, $3) RETURNING id`,[q.name, q.email, q.msg], (err, res) => {
        if(err) {
            console.log(err);
        } else {
            console.log('success');
        }
        // pool.end();
    })

    res.send('success')
})

//all method
app.all('/all',(req, res) => {
    
})

//app.get sigle row
app.get('/getOne', async function (req, res) {
    var qid = req.query.id; // 1
    //example query:{ id:1 }
    const result = await pool.query("SELECT * FROM test WHERE id = $1" ,[qid])

    res.send(result.rows);
})

//app.put
app.put('/change' ,(req, res) => {
    var q = req.query;
    
    console.log(q);
    pool.query("UPDATE test SET name = $2 WHERE id = $1", [q.id, q.name], (err, res) => {
        if(err) {
            console.log(err);
        } else {
            console.log("success")
        }
    })
    res.send('Success')
})

//app.delete
app.delete('/delete', (req, res) => {
    var q = req.query;
    pool.query("DELETE FROM test WHERE id = $1", [q.id], (err, res) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Delete success')
        }
    })
    res.send('Deleted')
})


const PORT = process.env.PORT || 8080





app.get('/getBalance', async (req, res) => {
    var q = req.query
    const result = await pool.query('SELECT balance FROM user WHERE id = $1', [q.id])
    res.send(result);
})

app.put('/transaction', (req, res) => {
    // { id:1 ,balance = 100, get = 50}
    var q = req.query
    var newBalance = q.balance - q.get;
    pool.query('UPDATE user SET balance = $2 WHERE id = $1', [q.id, newBalance], (err, res => {
        if(err) {
            console.log(err);

        } else {
            console.log('Success')
        }

    }))
    res.send('Your balance remaining is' + newBalance);
})

//set port
app.listen(PORT, () => {
    console.log('port listen on 8080')
})