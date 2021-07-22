const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const server = require('http').createServer(app);

const userRoute = require('./routes/user');
const verificationRoute = require('./routes/verify');

const fileUpload = require('express-fileupload');
const businessroutes = require('./routes/index');

// require('./config/db');
// const dotenv = require('dotenv');
// dotenv.config({ path: './config.env' });


mongoose.connect('mongodb+srv://raj:Raj@123@cluster0.qnil3.mongodb.net/api?retryWrites=true&w=majority',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
},() =>{
    console.log('connected to atlas...')
})

app.use(fileUpload({
    useTempFiles:true
}))
app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/user',userRoute);
app.use('/verify',verificationRoute);
app.use('/api',businessroutes);
   

app.use((req,res,next)=> {
    res.status(404).json({
        Error:'url not found'
    })          
})

  const port = process.env.PORT || 3005;
  server.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
