const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const port = 8000;

const app= express();
app.use(cors());
const api=require('./app/routes/api')
app.use(bodyParser.json())

app.use('/api',api)
app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(port,()=>console.log("server is listening on port "+ port))