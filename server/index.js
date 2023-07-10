
const express = require("express")
const app = express();
app.use(express.json())
const mongoose =require('mongoose');
const helmet = require('helmet');
const users = require('./models')
require("dotenv").config();

app.use(helmet());


const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/test";

mongoose.connect(MONGO_URI )
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.get('/', (req, res) => {
    res.send("welcome")
})


app.post('/api/submit', async(req, res) => {
    const date = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    // console.log(req.body)
try{
const save = await users.findOne({name: req.body.name})
if(save) return res.status(400).json({
    data:save,
    message:'User already registered'
});
const {
   
    name,
    address,
    amount
} = req.body;

const candidate = new users({
    date,
    name,
    address,
    amount
});

const saved  = await candidate.save();

return res.status(201).json({

    data: saved,
    status:"success",
    message:"candidate saved successfully"
})``
}
catch(error){
     console.log(error.message);
    }
})


app.get('/api/getallusers', async(req, res) => {
    try{
const allusers = await users.find()
// console.log(allusers);
return res.status(201).json({
    data: allusers,
    status:"success",
    message:"candidate get successfully"
})
    }
    catch(err){
console.log(err.message)
    }
})

app.get('/api/getsingleusers/:id', async(req, res) => {
    // console.log(req.params);
    try{
const singleusers = await users.findById(req.params.id)
//  console.log(singleusers);
return res.status(201).json({
    data: singleusers,
    status:"success",
    message:"candidate get successfully"
})
    }
    catch(err){
console.log(err.message)
    }
})
    
 
const PORT = process.env.PORT || 3001;
app.listen(PORT , () =>{
    console.log(`server is ready ${PORT}`);
})
