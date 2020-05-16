const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let campgrounds = [
    { name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60' },
    { name: 'Granite Hill', image: 'https://images.unsplash.com/photo-1453785675141-67637e2d4b5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60' },
    { name: 'Salmon Creek', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60' },
    { name: 'Granite Hill', image: 'https://images.unsplash.com/photo-1453785675141-67637e2d4b5c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60' }
];

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    res.render('campgrounds', { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {
    // get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image}
    campgrounds.push(newCampground);

    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
})

app.listen(3000, () => console.log('YelpCamp has started...'));