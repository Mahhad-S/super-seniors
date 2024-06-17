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

app.get("/general-article", (req, res) => {
    res.render("general-article");
});

app.get("/character-article", (req, res) => {
    res.render("character-article");
});

app.get("/locations-article", (req, res) => {
    res.render("locations-article");
});

app.get("/Orgs-article", (req, res) => {
    res.render("Orgs-article");
});

app.get("/items-article", (req, res) => {
    res.render("items-article");
});

app.get('/viewArticle', (req, res) => {
    res.render('viewArticle');
});

app.get("/browser",(req,res)=>{
    res.render("browser")
})

app.get("/community",(req,res)=>{
    res.render("community")
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

app.post('/saveArticle', async (req, res) => {
    const { title, content } = req.body;
  
    const article = new Article({ title, content });
  
    try {
      await article.save();
      res.status(200).json({ message: 'Article saved successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error saving article', error: err });
    }
  });

app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect("/dashboard");
        }
        res.clearCookie('connect.sid');
        res.redirect("/");
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
