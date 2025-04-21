const mongoose=require('mongoose');


const mongo_url=process.env.MONGODB_URI;

mongoose.connect(mongo_url)
.then(()=>{
    console.log("Mongodb Connected...");
}).catch((err)=>{
      console.log("MongoDb Connection errro:",err);
})