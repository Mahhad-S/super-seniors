const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');
const srcPath = path.join(__dirname, '../src');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath)); // Serve static files

// Configure session middleware
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/SuperSeniors',
        collectionName: 'sessions'
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));
app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/dashboard",(req,res)=>{
    res.render("dashboard")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/articleCreation", (req, res) => {
    res.render("articleCreation");
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
}

app.get("/", (req, res) => {
    if (req.session.user) {
        res.redirect("/dashboard");
    } else {
        res.render("home");
    }
});

app.get("/dashboard", isAuthenticated, (req, res) => {
    res.render("dashboard");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/browser",(req,res)=>{
    res.render("browser")
})

app.post("/register", async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    };

    const user = await collection.insertMany([data]);
    req.session.user = user[0]; // Set the user session
    res.redirect("/dashboard");
});

app.post("/login", async (req, res) => {
    const { name, password, rememberMe } = req.body;
    const user = await collection.findOne({ name, password });

    if (user) {
        req.session.user = user;
        if (rememberMe) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
        }
        res.redirect("/dashboard");
    } else {
        res.render("login", { error: "Username or Password Incorrect. Please register for an account if you have not already" });
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect("/dashboard");
        }
        res.clearCookie('connect.sid');
        res.redirect("/login");
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
