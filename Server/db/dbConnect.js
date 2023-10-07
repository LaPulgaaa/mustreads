import mongoose from "mongoose";

async function connectDb(){
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology: true,
            useNewUrlParser: true,

        });
        console.log("mongoose connected",conn.connection.host);
    }catch(error)
    {
        console.log(error);
        process.exit();
    }

}

export default connectDb