const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser: true
}).then(()=>{
    console.log("Database connection established");
}).catch((err)=>{
    console.log("Error connecting to MongoDB: " + err.message);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs');
app.set('views','./views');
const Routes = require('./routes/routes');
app.use(Routes);

app.listen(port,()=>{
    console.log(`App listening on ${port}`);
})