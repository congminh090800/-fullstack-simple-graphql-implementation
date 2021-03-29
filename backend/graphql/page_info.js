const { gql } = require('apollo-server');
const mongooseSchema= require('../models/mongoose_schema');

exports.PageInfo=gql`
    union Doc= Restaurant | Neighborhood
    type PageInfo{
        docs: [Doc]
        totalDocs: Int
        limit: Int
        page: Int
        totalPages: Int
        hasNextPage: Boolean
        nextPage: Int
        hasPrevPage: Boolean
        prevPage: Int
        pagingCounter: Int
    }
    extend type Query{
        searchDocs(keyword:String!, limit: Int, page: Int, type:String!): PageInfo
    }
`;
exports.pageInfoTD={
    Doc: {
        __resolveType(obj,_,__){
          if(obj.restaurant_id){
            return 'Restaurant';
          }
          else return 'Neighborhood';
        },
      },
    Query:{
      searchDocs: async(_,{keyword,limit=10,page=1,type="Restaurant"})=>{
        const options={
          limit,
          page
        };
        filter={
          $or:[
            {name:new RegExp(keyword,'i')},
            {borough:new RegExp(keyword,'i')},
            {"address.building":new RegExp(keyword,'i')},
            {"address.street":new RegExp(keyword,'i')},
          ]
        };
        if (type==="Restaurant"){
          return await mongooseSchema.restaurant.paginate(filter,options);
        }else if (type==="Neighborhood"){
          return await mongooseSchema.neighborhood.paginate(filter,options);
        }
      }
    }
}