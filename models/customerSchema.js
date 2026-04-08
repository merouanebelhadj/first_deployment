const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const customerSchema = new Schema({
nom:String,
prenom:String,
email:String,
specialite:String,
mobileNumber:String,
age:String,
country:String,
sexe:String,
});
 
 
// Create a model based on that schema
const Customer = mongoose.model("Customer", customerSchema);
 
 
// export the model
module.exports = Customer;