const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require("mongoose"),
      passport    = require('passport'),
      LocalStrategy = require('passport-local'),
      Campground  = require("./models/campground"),
      Comment     = require("./models/comment"),
      User        = require("./models/user"),
      seedDB      = require("./seed")

const commentRoutes    = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes      = require("./routes/index")

seedDB();
mongoose.set('useUnifiedTopology', true)
mongoose.connect("mongodb://localhost/yelp_camp_v7", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));

// Passport Configuration

app.use(require('express-session')({
    secret: "Ifrit",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware that will run currentUser on every single route.
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(3000, () => console.log('YelpCamp has started...'));