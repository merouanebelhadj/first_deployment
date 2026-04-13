const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Customer = require("./models/customerSchema");

// ===== MIDDLEWARE =====
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// ===== CONNECT MONGODB =====
mongoose.connect("mongodb+srv://merouane:mNb7IB5J7byYuVfH@cluster0.qsmyaqd.mongodb.net/all-data?appName=Cluster0")
.then(() => {
    app.listen(port, () => {
        console.log(`🚀 http://localhost:${port}`);
    });
})
.catch(err => console.log(err));

// ================= ROUTES =================

// HOME PAGE
app.get("/", (req, res) => {
    Customer.find()
    .then(result => {
        res.render("index", { arr: result });
    })
    .catch(err => console.log(err));
});

// INDEX PAGE
app.get('/index', (req, res) => {
    res.render('index');
});

// ADD PAGE
app.get('/user/add.html', (req, res) => {
    res.render('user/add');
});

// VIEW USER
app.get("/user/:id", (req, res) => {
    Customer.findById(req.params.id)
    .then(result => {
        res.render("user/view", { obj: result });
    })
    .catch(err => console.log(err));
});

// EDIT PAGE
app.get('/edit/:id', (req, res) => {
    Customer.findById(req.params.id)
    .then(result => {
        res.render("user/edit", { obj: result });
    })
    .catch(err => console.log(err));
});

// CREATE
app.post('/user/add.html', (req, res) => {
    Customer.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err));
});

// SEARCH
app.post('/search', (req, res) => {
    Customer.find({ firstName: req.body.searchText })
    .then(result => {
        res.render("user/search", { arr: result });
    })
    .catch(err => console.log(err));
});

// UPDATE
app.put('/edit/:id', (req, res) => {
    Customer.updateOne({ _id: req.params.id }, req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err));
});

// DELETE
app.delete('/delete/:id', (req, res) => {
    Customer.deleteOne({ _id: req.params.id })
    .then(() => res.redirect("/"))
    .catch(err => console.log(err));
});