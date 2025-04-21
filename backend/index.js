const express=require('express');
const app =express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const AuthRoute=require('./Routes/AuthRouter');
const ProductRouter=require('./Routes/ProductRouter');


require('dotenv').config();
require('./Models/db');


const PORT= process.env.PORT || 8080;

app.get('/ping',(req,res)=>{
    res.send('PONG');
})

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


app.use('/auth',AuthRoute);
app.use('/products',ProductRouter);


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
  

// Static file serving
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch-all route for SPA
app.get('/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});



app.listen(PORT ,()=>{
     console.log(`Server is running on ${PORT}`);
})