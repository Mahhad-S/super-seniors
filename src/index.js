const express = require("express");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose")
const app = express();
const path = require("path");

const userModel = require('./User.js');

const templatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');
const srcPath = path.join(__dirname, '../src');

mongoose
    .connect("mongodb://localhost:27017/SuperSeniors")
    .then((res)=>{
        console.log("MongoDB Connected")
    })
    .catch((error)=>{
        console.log("Failed to Connect",error)
    })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session middleware
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/SuperSeniors',
        collectionName: 'sessions'
    }),
}));

// Serve static files
app.use(express.static(publicPath)); 
app.use(express.static(srcPath));

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.isAuthenticated) {
        return next();
    } else {
        res.redirect('/login');
    }
}

// Routes to serve HTML files
app.get("/",(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/home.html'));
});

app.get("/dashboard", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/dashboard.html'));
});

app.get("/login",(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/login.html'));
});

app.get("/articleCreation",(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/articleCreation.html'));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/register.html'));
});

app.get("/general-article",(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/general-article.html'));
});

app.get("/character-article",(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/character-article.html'));
});

app.get("/locations-article",(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/locations-article.html'));
});

app.get("/Orgs-article",(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/Orgs-article.html'));
});

app.get("/items-article",(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/items-article.html'));
});

app.get('/viewArticle',(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/viewArticle.html'));
});

app.get("/browser",(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/browser.html'));
});

app.get("/community",(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/community.html'));
});

app.get("/articleCreation",(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/articleCreation.html'));
});

app.get("/general-article",(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/general-article.html'));
});

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        let user = await userModel.findOne({ username });
        if (user) {
            console.log("User already exists");
            return res.redirect("/register?error=userexists");
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        user = new userModel({ 
            username, 
            email, 
            password: hashedPassword 
        });

        await user.save();
        console.log("User registered successfully");
        res.redirect("/login");
    } catch (error) {
        console.error("Error registering user:", error);
        res.redirect("/register?error=true");
    }
});


app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username });
        if (!user) {
            console.log("User not found");
            return res.redirect("/login?error=notfound");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password does not match");
            return res.redirect("/login?error=incorrectpassword");
        }

        req.session.isAuthenticated = true;
        console.log("User authenticated successfully");
        res.redirect("/dashboard");
    } catch (error) {
        console.error("Error during login:", error);
        res.redirect("/login?error=true");
    }
});

app.use("/login", (req, res, next) => {
    if (req.query.error) {
        res.sendFile(path.join(__dirname, '../templates/login.html'), { error: "Username or Password Incorrect. Please register for an account if you have not already" });
    } else {
        next();
    }
});

app.post("/logout", isAuthenticated, (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/login");
      });
});

app.get("/navbar-logo", (req, res) => {
    if (req.session.user) {
    res.redirect("/dashboard");
    } else {
    res.redirect("/");
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


