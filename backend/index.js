import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRouter.js'
import productRouter from './routes/productRouter.js'
import userRouter from './routes/usersRouter.js'
import orderRouter from './routes/orderRouter.js'

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false })); //check in google

const PORT = process.env.PORT || 8080; //make sure have port 

//routes
app.use("/api/v1/seed",seedRouter);
app.use("/api/v1/product",productRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/orders",orderRouter);

app.use((error,req, res, next) => {
    res.status(500).send({message: error.message});
})

//הוספנו לפני הסימן שאלה את השם של הדאטה בייס המרכזי שלנו 

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(()=>
    {
        app.listen(PORT, function()
        {
            console.log('listening on port ', PORT);
        })
    }).catch(err =>{
        console.log(err.message);
    });
