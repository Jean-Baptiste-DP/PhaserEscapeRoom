const APP_URL = "http://localhost:3000";
const APP_PORT = "3000";
const express = require('express');
  
const app = express();
var cors = require("cors")

//cors
app.use(cors({
    origin: APP_URL
}));

//index.html redirection
app.get('/', function (req, res) {
    res.redirect('/index.html');
});

app.use('/', express.static('./static'))
  
app.listen(APP_PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ APP_PORT) 
    else 
        console.log("Error occurred, server can't start", error);
    }
);