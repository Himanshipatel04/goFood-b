import express from "express";
import "dotenv/config"
import dbConnection from "./db/dbConnection";
import cors from "cors"

const app = express();
dbConnection();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.get("/",(req,res)=>{
    res.send("Himanshi Patel")
}) 


 
//Routes
import userRoutes from "./routes/user.routes.js"
app.use("/users/api/v1",userRoutes)

import dataRoutes from "./routes/data.routes.js"
app.use("/api/v1",dataRoutes)

import orderRoutes from "./routes/order.routes.js"
app.use("/api/v1",orderRoutes)








app.listen(process.env.PORT || 4000 , () => {
    console.log(`Server is running at ${process.env.PORT}`);
})
