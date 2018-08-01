var express     = require("express");
var router      = express.Router();
var Campground  = require("../models/campground");
var middleware  = require("../middleware");

//Index- Show all Campground Routes
router.get("/", function(req, res){
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err)
        }
        else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds})
        }
    })
    
})

//Create add new campground to DB
router.post("/",middleware.isloggedIn, function(req, res){
    var name= req.body.name;
    var price= req.body.price;
    var image= req.body.image;
    var desc= req.body.description;
    var author={
        id: req.user._id,
        username: req.user.username
    }
    var newCampground= {name: name, price:price, image: image, description: desc,author:author}
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlycreated){
        if(err){
            console.log(err)
        }
        else{
            req.flash("success", "Successfully added campground")
            res.redirect("/campgrounds")
        }
    }); 
});

//Show Form to create new campground    
router.get("/new",middleware.isloggedIn, function(req, res){
    res.render("campgrounds/new")
})

//Show more info about one campground
router.get("/:id", function(req, res){
    
    Campground.findById(req.params.id).populate("comments").populate("ratings").exec(function(err, foundCampground){
        if(err){
            console.log(err)
        }
        else{
            if(foundCampground.ratings.length > 0){
                var ratings =[];
                var length= foundCampground.ratings.length;
                foundCampground.ratings.forEach(function(rating){
                    ratings.push(rating.rating)
                });
            var rating = ratings.reduce(function(total, element){
                return total + element;
            })
            foundCampground.rating = rating / length;
            foundCampground.save()
            }
            console.log("Ratings", foundCampground.ratings)
            console.log("Rating", foundCampground.rating)
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
})

//Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground:foundCampground})
    })
})

//Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
        if(err){
            res.redirect("/campgrounds")
        }
        else{
            req.flash("success", "Campground update")
            res.redirect("/campgrounds/"+ req.params.id)
        }
    })
})
//Destroy Campground Route
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds")
        }
        else{
            req.flash("success", "Successfully Delete campground")
            res.redirect("/campgrounds")
        }
    })
})

module.exports  = router