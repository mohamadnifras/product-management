import mongoose from "mongoose";

const connectDB = async()=>{
    mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(()=> console.log("MongoDB connected"))
    .catch((err)=> console.log("MongoDB connection error:", err))
}

export default connectDB
