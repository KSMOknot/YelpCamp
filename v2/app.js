const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose")

mongoose.set('useUnifiedTopology', true)
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });


//SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create( { 
//     name: 'Granite Hill', 
//     image: 'https://images.unsplash.com/photo-1453785675141-67637e2d4b5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60',
//     description: "This is a random image"

// }, function(err, campground) {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(campground)
//     }
// });

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
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
})

app.listen(3000, () => console.log('YelpCamp has started...'));