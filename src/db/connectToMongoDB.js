const mongoose=require('mongoose')

const connectMongoDB=async()=>{

    try{

        await mongoose.connect(process.env.MONGO_DB_URI,) 
        console.log("connceted to mongodb");
        
    }
    catch(err){
        console.log("error to connect mongodb",err.message);
        
    }
}

module.exports=connectMongoDB