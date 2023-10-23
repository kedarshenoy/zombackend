
const express = require("express");
const app = express();
const routes=require("./Routes/index")
const mongoose =require("mongoose")
const bodyParser =require("body-parser")
app.use(bodyParser.json());
// const bp = require("body-parser");
// app.use(bp.urlencoded({ extended: false }));
const port = 5403;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use('/', routes);
// app.get("/", (req, res) => {
//   res.send('Hello World!')
//   // res.sendFile("index.html", { root: __dirname });
// });

mongoose.connect(
  'mongodb://localhost:27017/zomato',
  // 'mongodb+srv://kedar:connectionpassword@cluster0.ufsetpy.mongodb.net/zomato?retryWrites=true&w=majority',
  {
    useNewUrlParser:true,
    useUnifiedTopology:true,
  }
).then(success =>{
  console.log("connnected to mongoDB");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    // const db = mongoose.db("zomato");
  });
  
}).catch( error =>{
  console.log(error)
});

