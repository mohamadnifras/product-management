import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./src/config/db.js"
import errorHandler from "./src/middlewares/errorHandler.js"
import router from "./src/routes/index.js"

dotenv.config();

const app = express()


// CORS
app.use(cors({
    origin: process.env.FRONT_END_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

// Database Connection
connectDB();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


//Routes
app.use("/api", router)

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`))



