var express = require("express");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require("path");
app.use(express.static(path.join(__dirname, "./static")));

let mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');

app.use(express.static( __dirname + '/beltExam2Angular/dist' ));

// ==== NEW MONGOOSE CODE! =======
mongoose.connect('mongodb://localhost/beltExam2');
mongoose.Promise = global.Promise;

let ProductSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: [3, "Product name must be greater than 3 characters!"]},
    qty: {type: Number, required: true, min: [0, "Quantity cannoot be less than 0!"]},
    price: {type: Number, required: true, min: [1, "Price must be greater than 0!"]},
}, {timestamps: true});

mongoose.model('Product', ProductSchema); 
let Product = mongoose.model('Product')

// ==============================

app.get('/prods', function(req, res){
    Product.find({}, function(err, data){
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success", data}) //this returns an object because it includes a message.
        }
     })
});

app.post('/prods', function(req, res){
    console.log("BODY", req.body)
    let product = new Product(req.body);
    console.log(product)
    product.save(req.body, function (err, savedProduct){
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
            res.json({message: "Success", savedProduct})
            console.log("SAVEDPRODUCT:", savedProduct)
        }
     })
});

app.get('/prods/:id', function(req, res){
    Product.findOne({_id: req.params.id}, function(err, oneProd){
        if(err){
           console.log("Returned error", err);
           res.json({message: "Error", error: err})
        }
        else {
           res.json({message: "Success", data: oneProd})
           console.log("PRODUCT ", oneProd)
        }
     })
})

app.delete("/prods/:id", function(req, res) {
    console.log('initiating removal');
    Product.remove({_id: req.params.id},function(err, data) {
        // if there is an error console.log that something went wrong!
        if(err) {
          console.log("delete error ",err);
          res.send(err);
        } else { // else console.log that we did well and then redirect to the root route
          console.log('successfully deleted the product',data);
          res.json({message: "Delete success"});
        }
    });
});

app.put("/prods/:id", function(req, res) {
    console.log("PUTWORKS", req.body)
    var product = {};
    product.name = req.body.name;
    product.qty = req.body.qty;
    product.price = req.body.price;
    
    console.log("PUT /pets/:id PET ",product)
    console.log("PUT /pets/:id id ",req.params.id)

    Product.update({_id: req.params.id}, product, { runValidators: true}, function (err, results) { // don't forget to add { runValidators: true}
        if(err){
            console.log("Returned error", err);
            res.json({message: "Update error", error: err})
        }
        else {
            console.log('successfully updated the product', results);
            res.json({message: "Update success", results});
        }
    });

});


app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./beltExam2Angular/dist/index.html"))
  });

app.listen(8000, function() {
    console.log("Beltexam2 listening on port 8000");
});