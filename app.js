let express = require('express')
let app = express()
let bodyparser = require('body-parser')



app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
})

app.listen(3000, function(){
    console.log("School info data server is loaded!")
})

app.get('/', function(req, res, next){
    res.send("Hello world!")
})
app.use(require('./router'))