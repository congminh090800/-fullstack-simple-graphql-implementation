//Require Mongoose
const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const mongoosePaginate = require('mongoose-paginate-v2');
//Define a schema
const Schema = mongoose.Schema;

const addressSchema=new Schema({
  _id: false,
  building: String,
  coord: [Schema.Types.Double],
  street: String,
  zipcode: String
});

const gradeSchema=new Schema({
  date: Date,
  grade: String,
  score: Number
});
const geometrySchema=new Schema({
  _id: false,
  coordinates:[[[Schema.Types.Double]]],
  type : String
});

const restaurantSchema= new Schema({
  address: addressSchema,
  borough: String,
  cuisine: String,
  grades: [gradeSchema],
  name: String,
  restaurant_id: String
});


const neighborhoodSchema= new Schema({
  name: String,
  geometry: geometrySchema
});
restaurantSchema.plugin(mongoosePaginate);
neighborhoodSchema.plugin(mongoosePaginate);
exports.restaurant=mongoose.model('Restaurant', restaurantSchema);
exports.neighborhood=mongoose.model('Neighborhood', neighborhoodSchema);