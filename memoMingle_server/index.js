const express = require('express');
const connectToMongo = require('./db');
const cors = require('cors');


connectToMongo();

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

//Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// app.get('/',(req,res)=>{
//     res.send("My Name is Shaun Dabre");
// })

app.listen(port, ()=>{
    console.log(`iNotebook backend listening on ${port}`)
})

