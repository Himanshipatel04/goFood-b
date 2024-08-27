import mongoose from "mongoose";

const dbConnection = async() => {
      try {
        await mongoose.connect(process.env.MONGO_URI,{dbName:"GoFood"})
        console.log("Database connected successfully!");
          
        
      } catch (error) {
        console.log(`Error from db connection ${error}`);
      }
}

export default dbConnection   