const { gql } = require('apollo-server');
const mongooseSchema= require('../models/mongoose_schema');
const {dotNotate,toObject}=require('./utility_functions');


exports.Restaurant = gql`

  type Address{
    building: String
    coord: [Float]
    street: String
    zipcode: String
  }
  input AddressInput{
    building: String
    coord: [Float]
    street: String
    zipcode: String
  }
  type Grade{
    date: String
    grade: String
    score: Int
  }
  input GradeInput{
    date: String
    grade: String
    score: Int
  }
  type Restaurant{
    _id:ID
    address:Address
    borough: String
    cuisine: String
    grades: [Grade]
    name: String
    restaurant_id: String
  }

  input RestaurantInput{
    _id:ID
    address:AddressInput
    borough: String
    cuisine: String
    grades: [GradeInput]
    name: String
    restaurant_id: String
  }

  extend type Query{
    restaurants(filter: RestaurantInput, page: Int, limit: Int):PageInfo
    findRestaurantsByNeighborhood(_id: ID!, page: Int, limit: Int, pagination: Boolean):PageInfo
  }
`;

exports.restaurantResolvers = {
    Query: {
      restaurants: async (_,{filter={},page=0,limit=10}) => {
        const options={
          page:page,
          limit:limit
        }
        return await mongooseSchema.restaurant.paginate(dotNotate(toObject(filter)),options);
      },
      findRestaurantsByNeighborhood: async(_,{_id,page=0,limit=10,pagination=false})=>{
        const neighborhood=await mongooseSchema.neighborhood.findById(_id).exec();
        const options={
          page:page,
          limit:limit,
          pagination:pagination
        }
        return await mongooseSchema.restaurant.paginate({
          "address.coord":{$geoWithin:{
            $geometry: neighborhood.geometry
          }}
        },options);
      }
    },
};