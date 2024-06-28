const express = require("express");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose")
const app = express();
const path = require("path");
const cors = require('cors');

const userModel = require('./User');
const {
    GeneralArticleCollection,
    CharacterArticleCollection,
    ItemsArticleCollection,
    LocationsArticleCollection,
    OrganizationsArticleCollection
} = require('./mongodb');

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
app.use(cors({
    origin: 'http://localhost:3000'
}));

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
    res.sendFile(path.join(__dirname, '../templates/Article/general-article.html'));
});

app.get("/character-article",(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/Article/character-article.html'));
});

app.get("/locations-article",(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/Article/locations-article.html'));
});

app.get("/Orgs-article",(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/Article/orgs-article.html'));
});

app.get("/items-article",(req, res) => {
    res.sendFile(path.join(__dirname, '../templates/Article/items-article.html'));
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

app.post('/saveArticleGen', async (req, res) => {
    const { title, body, sttb, sptb, spbb, sbtb } = req.body;

    const newArticle = new GeneralArticleCollection({
        title,
        body,
        sttb,
        sptb,
        spbb,
        sbtb
    });

    try {
        await newArticle.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error saving article:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/saveArticleItem", async (req, res) => {
    const { title, body, sttb, sptb, spbb, sbtb } = req.body;

    const newArticle = new ItemsArticleCollection({
        title,
        body,
        sttb,
        sptb,
        spbb,
        sbtb
    });

    try {
        await newArticle.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error saving article:", error);
        res.redirect('/items-article');
    }
});

app.post("/saveArticleCharacter", async (req, res) => {
    const { title, body, sttb, sptb, spbb, sbtb, 
            ch_hair, ch_skin, ch_eyes, ch_height, ch_weight, ch_sex, ch_gender,
            ch_race, ch_eth, ch_nationality, ch_age} = req.body;

    const newArticle = new CharacterArticleCollection({
        title,
        body,
        sttb,
        sptb,
        spbb,
        sbtb,
        ch_hair, 
        ch_skin, 
        ch_eyes, 
        ch_height, 
        ch_weight, 
        ch_sex, 
        ch_gender,
        ch_race, 
        ch_eth, 
        ch_nationality, 
        ch_age
    });

    try {
        await newArticle.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error saving article:", error);
        res.redirect('/character-article');
    }
});

app.post("/saveArticleOrg", async (req, res) => {
    const { title, body, sttb, sptb, spbb, sbtb } = req.body;

    const newArticle = new OrganizationsArticleCollection({
        title,
        body,
        sttb,
        sptb,
        spbb,
        sbtb
    });

    try {
        await newArticle.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error saving article:", error);
        res.redirect('/Orgs-article');
    }
});

app.post("/saveArticleLocation", async (req, res) => {
    const { title, body, sttb, sptb, spbb, sbtb } = req.body;

    const newArticle = new LocationsArticleCollection({
        title,
        body,
        sttb,
        sptb,
        spbb,
        sbtb
    });

    try {
        await newArticle.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error saving article:", error);
        res.redirect('/locations-article');
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
        res.redirect("/");
    });
});

app.get("/navbar-logo", (req, res) => {
    if (req.session.isAuthenticated) {
        res.redirect("/dashboard");
    } else {
        res.redirect("/");
    }
});

app.get("/viewArticleGeneral", async (req, res) => {
    try {
        const articles = await GeneralArticleCollection.find({});
        res.json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/viewArticleCharacter", async (req, res) => {
    try {
        const articles = await CharacterArticleCollection.find({});
        res.json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/viewArticleItems", async (req, res) => {
    try {
        const articles = await ItemsArticleCollection.find({});
        res.json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/viewArticleLocations", async (req, res) => {
    try {
        const articles = await LocationsArticleCollection.find({});
        res.json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/viewArticleOrganizations", async (req, res) => {
    try {
        const articles = await OrganizationsArticleCollection.find({});
        res.json(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).send("Internal Server Error");
    }
});

// this route will be used to get a specific article based on the category and id of the article from the browser for viewing
app.get("/getArticle/:category/:id", async (req, res) => {
    const { category, id } = req.params;
    let collection;

    switch (category) {
        case 'general':
            collection = GeneralArticleCollection;
            break;
        case 'character':
            collection = CharacterArticleCollection;
            break;
        case 'items':
            collection = ItemsArticleCollection;
            break;
        case 'locations':
            collection = LocationsArticleCollection;
            break;
        case 'organizations':
            collection = OrganizationsArticleCollection;
            break;
        default:
            return res.status(400).send("Invalid category");
    }

    try {
        const article = await collection.findById(id);
        res.json(article);
    } catch (error) {
        console.error("Error fetching article:", error);
        res.status(500).send("Internal Server Error");
    }
});

// this route will be used to get a specific article based on the category and id of the article from the browser and delete it
app.delete("/deleteArticle/:category/:id", async (req, res) => {
    const { category, id } = req.params;
    let collection;

    switch (category) {
        case 'general':
            collection = GeneralArticleCollection;
            break;
        case 'character':
            collection = CharacterArticleCollection;
            break;
        case 'items':
            collection = ItemsArticleCollection;
            break;
        case 'locations':
            collection = LocationsArticleCollection;
            break;
        case 'organizations':
            collection = OrganizationsArticleCollection;
            break;
        default:
            return res.status(400).send("Invalid category");
    }

    try {
        await collection.findByIdAndDelete(id);
        res.sendStatus(200);
    } catch (error) {
        console.error("Error deleting article:", error);
        res.status(500).send("Internal Server Error");
    }
});

// this route will be used to get a specific article based on the category and id of the article from the browser and update it
app.get('/getArticleDetails/:category/:id', async (req, res) => {
    const { category, id } = req.params;
    let collection;

    switch (category) {
        case 'general':
            collection = GeneralArticleCollection;
            break;
        case 'character':
            collection = CharacterArticleCollection;
            break;
        case 'items':
            collection = ItemsArticleCollection;
            break;
        case 'locations':
            collection = LocationsArticleCollection;
            break;
        case 'organizations':
            collection = OrganizationsArticleCollection;
            break;
        default:
            return res.status(400).send("Invalid category");
    }

    try {
        const article = await collection.findById(id);
        res.json(article);
    } catch (error) {
        console.error("Error fetching article details:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/updateArticle/:category/:id', async (req, res) => {
    const { category, id } = req.params;
    const { title, body, sttb, sptb, spbb, sbtb, 
            ch_hair, ch_skin, ch_eyes, ch_height, ch_weight, ch_sex, ch_gender,
            ch_race, ch_eth, ch_nationality, ch_age} = req.body;
    let collection;

    switch (category) {
        case 'general':
            collection = GeneralArticleCollection;
            break;
        case 'character':
            collection = CharacterArticleCollection;
            break;
        case 'items':
            collection = ItemsArticleCollection;
            break;
        case 'locations':
            collection = LocationsArticleCollection;
            break;
        case 'organizations':
            collection = OrganizationsArticleCollection;
            break;
        default:
            return res.status(400).send("Invalid category");
    }

    try {
        await collection.findByIdAndUpdate(id, { title, body, sttb, sptb, spbb, sbtb, 
                                                ch_hair, ch_skin, ch_eyes, ch_height, ch_weight, ch_sex, ch_gender,
                                                ch_race, ch_eth, ch_nationality, ch_age});
        res.redirect('/dashboard');
    } catch (error) {
        console.error("Error updating article:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
