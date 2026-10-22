const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const dns = require('dns')
dns.setDefaultResultOrder('ipv4first')
require('dotenv').config()
const PORT=process.env.PORT || 5000

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL
    // ,{useNewUrlParse:true,useUnifiedtopology:true}
)

const bookSchema=new mongoose.Schema({
    title:String,
    author:String,
    description:String,
    PublishedYear:Number
})

const Book=mongoose.model('Book',bookSchema)

//implement crud

app.post('/books',async(req,res)=>{
    const newbook=new Book(req.body)
    await newbook.save()
    res.json(newbook)
})

//get book by id
app.get('/books/:id',async(req,res)=>{
    const book=await Book.findById(req.params.id)
    res.json(book)
})
app.get('/books/',async(req,res)=>{
    const book=await Book.find()
    res.json(book)
})

//update
app.put('/books/:id',async(req,res)=>{
    const updatebook=await Book.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.json(updatebook)

})
//delete
app.delete('/books/:id',async(req,res)=>{
    const updatebook=await Book.findByIdAndDelete(req.params.id)
    res.json({message:"Book is deleted"})

})


//search 
app.get('/search',async(req,res)=>{
    const {query}=req.query
    const book=await Book.find({title:{$regex: query,$options:"i"}})
    res.json(book)
})























app.listen(PORT,()=>{
    console.log("SERVER IS RUNNING AT THE PORT:",PORT)
})