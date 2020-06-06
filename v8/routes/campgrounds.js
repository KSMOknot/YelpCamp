const express = require('express');
const router  = express.Router();
const Campground = require('../models/campground');




// INDEX - Show all campgrounds
router.get('/', function(req, res) {
    Campground.find({}, (err, allCampgrounds) => err ? console.log(err) : res.render('campgrounds/index', { campgrounds: allCampgrounds}));
});

// CREATE - 
router.post("/", function(req, res) {
    // get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = {name: name, image: image, description: description}
    Campground.create(newCampground, (err, newCreated) => err ? console.log(err) : res.redirect("/campgrounds"))
});

// NEW - Show form to create new campground
router.get("/new", function(req,res){
    res.render("campgrounds/new");
})


//SHOW - shows more info abot campground
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

module.exports = router;