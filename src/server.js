const express=require('express')
const dotenv=require('dotenv')
dotenv.config()

const cookieParser=require("cookie-parser")
const connectMongoDB = require('./db/connectToMongoDB')
const authRoutes=require("./routes/authRoutes")
const cors=require('cors')
const ItemsRoute=require('./routes/itemsRoute')
const orderRoute=require('./routes/orderRoutes')
const paymentRoute=require('./routes/paymentRoutes')
const userRouter=require('./routes/userRoutes')
const app=express()
const PORT=process.env.PORT 

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/auth',authRoutes)
app.use('/getUsers',userRouter)
app.use('/items',ItemsRoute)
app.use('/order',orderRoute)
app.use('/uploads',express.static('./uploads'))
app.use('/payment',paymentRoute)


app.listen(PORT,()=>{
    connectMongoDB()
    console.log(`server running on port ${PORT}`);
    
})