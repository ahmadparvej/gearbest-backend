const express = require("express");
const cors = require("cors")
const connection =require("./db")
const app = express();
const jwt = require("jsonwebtoken")
const port = process.env.PORT || 3737
const authRouter = require("./Routes/auth.routes");
require("dotenv").config();

app.use(express.json())
app.use(cors())
app.use('/auth',authRouter)

app.listen(port,async()=>{
    try {
        await connection
    } catch (error) {
        console.log(error);
    }
    console.log(`running on port http://localhost:${port}`);
})