const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');
const {merge}= require('lodash');
const {Restaurant,restaurantResolvers}=require('./restaurant');
const {Neighborhood,neighborhoodResolvers}=require('./neighborhood');
const {PageInfo, pageInfoTD}=require('./page_info');
const Query = gql`
  type Query {
    _empty: String
  }
`;
;
const resolvers=[restaurantResolvers,neighborhoodResolvers,pageInfoTD];

module.exports=makeExecutableSchema({
  typeDefs: [ Query, Restaurant, Neighborhood, PageInfo],
  resolvers: merge(resolvers),
});