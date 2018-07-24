var mongoose    = require("mongoose")
var Campground  = require("./models/campground")
var Comment     = require("./models/comment")

var data=[
    {
    name: "Hill Camp",
    image: "https://farm5.staticflickr.com/4134/4901707346_ec6b7d676a.jpg",
    description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary."
    },
    {
        name: "River Side Camp",
        image: "https://farm3.staticflickr.com/2288/5808881553_8c3214a9ce.jpg",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
    },
    {
        name: "Moon Light Camp",
        image: "https://farm4.staticflickr.com/3015/2764147542_0758364566.jpg",
        description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32."
    }  
]
function seedDb(){
    Campground.remove({},function(err){
    //     if(err){
    //         console.log(err)
    //     }
    //     console.log("remove campground!!!")
    // })
    //     data.forEach(function(seed){
    //         Campground.create(seed, function(err, campground){
    //             if(err){
    //                 console.log(err)
    //             }
    //             else{
    //                 console.log("added campground")
    //                 Comment.create(
    //                     {
    //                         text: "This place is great, but i wish there was internet",
    //                         author: "Bruce"
    //                     }, function(err, comment){
    //                         if(err){
    //                             console.log(err)
    //                         }
    //                         else{
    //                             campground.comments.push(comment);
    //                             campground.save();
    //                             console.log("added comment")
    //                         }
    //                     });
    //             }
    //         });
         });
    
}
module.exports= seedDb