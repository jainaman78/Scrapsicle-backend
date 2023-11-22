import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
 import gigRoute from "./routes/gig.route.js";
// import orderRoute from "./routes/order.route.js";
// import conversationRoute from "./routes/conversation.route.js";
// import messageRoute from "./routes/message.route.js";
// import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express();
mongoose.set("strictQuery", true);
dotenv.config()

const connect = async () => {
    try {
      await mongoose.connect('mongodb+srv://jainaman9003:aman7838@cluster0.lnuuhym.mongodb.net/?retryWrites=true&w=majority&dbname=scrapsicle');
      console.log("Connected to mongoDB!");
    } catch (error) {
      console.log(error);
    }
  };
  
  app.use(cors({origin:"http://localhost:5173",credentials:true}));
  app.use(express.json());
 app.use(cookieParser());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/gig",gigRoute);
// app.use("/api/users",orderRoute);
// app.use("/api/users",conversationRoute);
// app.use("/api/users",messageRoute);
// app.use("/api/users",reviewRoute);
app.use((err,req,res,next)=>{
  const errorStatus=err.status || 500
  const errorMessage=err.message || "Something went wrong!"

  return res.status(errorStatus).send(errorMessage);
})


app.listen(8800,()=>{
    connect();
    console.log("backend is running")
})
