// COMMAND TO RUN LOCAL SERVER
// In terminal input command: nodemon src/index.js
// In case of error: Make sure your Execution policy
// in windows powershell is set to Unrestrict

// Import required modules
const express=require("express")
const app=express()
const path=require("path")
const hbs=require("hbs")
const collection=require("./mongodb")

// Set paths for template and public directories
const templatePath=path.join(__dirname,'../templates')
const publicPath = path.join(__dirname, '../public')

// Middleware to parse JSON and URL-encoded data
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// Set view engine to Handlebars and specify views directory
app.set("view engine","hbs")
app.set("views",templatePath)

// Serve static files from the public directory
app.use(express.static(publicPath));

// Route for the login page
app.get("/",(req,res)=>{
    res.render("login")
})

// Route for the registration page
app.get("/register",(req,res)=>{
    res.render("register")
})

// Handle user registration
app.post("/register",async (req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password
    }

    // Insert new user data into the collection
    await  collection.insertMany([data])

    // Render the home page after successful registration
    res.render("home")
})

// Handle user login
app.post("/login",async (req,res)=>{
    const {name,password} = req.body
    const user=await collection.findOne({ name, password })

    // Check if user exists and credentials are correct
    if (user){
        res.render("home")
    } else{
        res.render("login", { error: "Username or Password Incorrect. Please register for an account if you have not already" })
    }
})

// Start the server on port 3000
app.listen(3000,()=>{
    console.log("port connected")
})
