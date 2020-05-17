const express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require("mongoose"),
      Campground  = require("./models/campground"),
      Comment     = require("./models/comment");
      seedDB      = require("./seed")

seedDB();
mongoose.set('useUnifiedTopology', true)
mongoose.connect("mongodb://localhost/yelp_camp_v4", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render('landing');
});

// INDEX - Show all campgrounds
app.get('/campgrounds', function(req, res) {
    Campground.find({}, (err, allCampgrounds) => err ? console.log(err) : res.render('campgrounds/index', { campgrounds: allCampgrounds }));
});

// CREATE - 
app.post("/campgrounds", function(req, res) {
    // get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = {name: name, image: image, description: description}
    Campground.create(newCampground, (err, newCreated) => err ? console.log(err) : res.redirect("/campgrounds"))
});

// NEW - Show form to create new campground
app.get("/campgrounds/new", function(req,res){
    res.render("campgrounds/new");
})


//SHOW - shows more info abot campground
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

// ==================
// Comment Routes
// ==================

app.get("/campgrounds/:id/comments/new", function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if (err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
});

app.post("/campgrounds/:id/comments", function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err){
            console.log(err);
            redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campgrounds.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});


app.listen(3000, () => console.log('YelpCamp has started...'));