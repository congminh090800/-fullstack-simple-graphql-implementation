const { gql } = require('apollo-server');
const mongooseSchema= require('../models/mongoose_schema');
const {dotNotate,toObject}=require('./utility_functions');
const mongoosePaginate = require('mongoose-paginate-v2');

exports.Neighborhood = gql`
  type Geometry{
    coordinates: [[[Float]]]
    type : String
  }

  input GeometryInput{
    coordinates: [[[Float]]]
    type : String
  }
    
  type Neighborhood{
    _id:ID
    name: String
    geometry: Geometry
  }

  input NeighborhoodInput{
    _id:ID
    name: String
    geometry: GeometryInput
  }
  extend type Query{
    neighborhoods(filter: NeighborhoodInput, page: Int limit: Int):PageInfo
  }
`;

exports.neighborhoodResolvers={
    Query: {
      neighborhoods: async(_,{filter={},page=0,limit=10})=>{
        const options={
          page:page,
          limit:limit
        }
        return await mongooseSchema.neighborhood.paginate(dotNotate(toObject(filter)),options);
      },
    },
}