import mongoose from "mongoose";
// import {} from 'dotenv/config';
import _ from '../env.js'

// dotenv.config({ path: path.join(__dirname, '.env') });
console.log((process.env.MONGO_URI))
async function connectDb(){
    try{
        const conn=await mongoose.connect("mongodb+srv://lapulga:28012002@admin.lm9byck.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp",{
            useUnifiedTopology: true,
            useNewUrlParser: true,

        });
        console.log("mongoose connected",conn.connection.host);
    }catch(error)
    {
        console.log(error);
        process.exit(1);
    }

}

export default connectDb