const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")

const templatePath=path.join(__dirname,'../templates')
const publicPath = path.join(__dirname, '../public')

app.use(express.json())
app.set("view engine","hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))
app.use(express.static(publicPath)); // Serve static files

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/dashboard",(req,res)=>{
    res.render("dashboard")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/register",async (req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
    }

    await  collection.insertMany([data])

    res.render("home")
})

app.post("/login",async (req,res)=>{
    const {name,password} = req.body
    const user=await collection.findOne({ name, password })

    if (user){
        res.render("dashboard")
    } else{
        res.render("login", { error: "Username or Password Incorrect. Please register for an account if you have not already" })
    }
})

app.listen(3000,()=>{
    console.log("port connected")
})
