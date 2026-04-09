const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');



app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
var methodOverride = require('method-override')
app.use(methodOverride('_method'))



//CONNECT TO MONGODB

mongoose.connect("mongodb+srv://merouane:mNb7IB5J7byYuVfH@cluster0.qsmyaqd.mongodb.net/all-data?appName=Cluster0").then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
 })
 .catch((err) => {
   console.log(err);
 });

  const Customer=require("./models/customerSchema")

 //GET REQUEST
 app.get('/', (req, res) => {
  res.render('login');
});

 app.get("/", (req, res) => {
  Customer.find()
    .then((result) => {
      console.log(result)
      res.render("index1",{arr: result});
      })
    .catch((err)  => {
      console.log(err);
      });
  });
 
  app.get('/user/add.html', (req, res) => {
  res.render('user/add');
});

app.get('/edit/:id', (req, res) => {
  
Customer.findById(req.params.id)
      .then((result) => {
      res.render("user/edit",{obj:result})
    
      })
    .catch((err)  => {
      console.log(err);
      })
      });
  

app.get("/user/:id", (req, res) => {

    
    Customer.findById(req.params.id)
      .then((result) => {
      console.log(result)
      res.render("user/view",{obj:result})
    
      })
    .catch((err)  => {
      console.log(err);
      });
  });


//POST REQUEST
app.post('/user/add.html', (req, res) => {
 console.log(req.body)

 Customer.create(req.body)
 .then( result => {
      res.redirect("/");
    })
 .catch( err => {
      console.log(err);
    });
});
//SEARCH by id

app.post('/search', (req, res) => {
 console.log(req.body.searchText);

 Customer.find({firstName:req.body.searchText})
  .then((result) => {
    console.log(result)
    res.render("user/search", {arr: result});
  }) 
  .catch( err => {
      console.log(err);
    }); 
 
});



//PUT REQUEST
app.put('/edit/:id', (req, res) => {
  console.log(req.body)
  Customer.updateOne({_id: req.params.id }, req.body)
  .then((params) => {
    res.redirect("/")


}).catch( err => {
    console.log(err)
});
});

//DELETE REQUEST

app.delete('/delete/:id', (req, res) => {
  Customer.deleteOne({_id: req.params.id })
  .then((params) => {
    res.redirect("/")
}).catch( err => {
    console.log(err)
});

  
});

