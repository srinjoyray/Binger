require('dotenv').config();
const express = require('express');
const app = express();
const userRoute = require('./routes/user.js');
const mongoose = require('mongoose');
const cors = require('cors');
bodyParser = require('body-parser').json();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.use('/user',bodyParser,userRoute);
app.get('/',(req,res)=>{
    res.json({
        message: "Welcome"
    })
})

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> {
        console.log('MongoDB connected...')
    })
    .catch((err)=> console.log(err))

if(process.env.NODE_ENV==='production')
{
    app.use(express.static('client/build'));
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
});