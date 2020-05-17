const express =     require('express'),
      app =         express(),
      bodyParser =  require('body-parser'),
      mongoose =    require("mongoose"),
      Campground =  require("./models/campground"),
      seedDB =      require("./seed")

seedDB();
mongoose.set('useUnifiedTopology', true)
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.get('/', function(req, res) {
    res.render('landing');
});

// INDEX - Show all campgrounds
app.get('/campgrounds', function(req, res) {
    Campground.find({}, (err, allCampgrounds) => err ? console.log(err) : res.render('index.ejs', { campgrounds: allCampgrounds }));
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
    res.render("new.ejs");
})


//SHOW - shows more info abot campground
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
})

app.listen(3000, () => console.log('YelpCamp has started...'));