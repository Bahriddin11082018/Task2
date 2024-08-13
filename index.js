const express = require('express')
const path=require('path')
const app=express()

const rotetime=require('./routes/user')
app.use(rotetime)

const PORT=process.env.PORT||2000
app.listen(PORT,()=>{
    console.log('Working port')
})
