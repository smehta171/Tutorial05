var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var appRoute = require('./Routes/appRoutes');


app = express();
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/api', appRoute);

app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:__dirname})
});


http.createServer(app).listen(process.env.PORT||3000);
console.log("server started");
