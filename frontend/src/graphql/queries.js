import {gql} from '@apollo/client';

export const getRestaurantPage=gql`
    query Query($filter: RestaurantInput, $page: Int, $limit: Int){
        restaurants(filter: $filter, page: $page, limit: $limit){
            page
            hasNextPage
            nextPage
            hasPrevPage
            prevPage
            totalPages
            totalDocs
            docs{
                ...on Restaurant{
                    name
                    _id
                    borough
                    address{
                        building
                        street
                        zipcode
                    }
                }
            }
        }
    }
`;
export const getNeighborhoodPage=gql`
    query Query($filter: NeighborhoodInput, $page: Int, $limit: Int){
        neighborhoods(filter: $filter, page: $page, limit: $limit){
            hasNextPage
            nextPage
            hasPrevPage
            prevPage
            totalPages
            totalDocs
            page
            docs{
                ...on Neighborhood{
                    name
                    _id
                }
            }
        }
    }
`;
export const findRestaurantsByNeighborhood=gql`
    query Query($_id: ID!, $page: Int, $limit: Int, $pagination: Boolean){
        findRestaurantsByNeighborhood(_id:$_id, page:$page, limit:$limit, pagination:$pagination){
            page
            hasNextPage
            nextPage
            hasPrevPage
            prevPage
            totalPages
            totalDocs
            docs{
                ...on Restaurant{
                    name
                    _id
                    borough
                    address{
                        building
                        street
                        zipcode
                    }
                }
            }
        }
    }
`;

export const searchDocs=gql`
    query Query($keyword: String!, $page: Int, $limit: Int, $type:String!){
        searchDocs(keyword:$keyword, limit: $limit, page: $page, type:$type){
            page
            hasNextPage
            nextPage
            hasPrevPage
            prevPage
            totalPages
            totalDocs
            docs{
                ...on Restaurant{
                    name
                    _id
                    borough
                    address{
                        building
                        street
                        zipcode
                    }
                }
                ...on Neighborhood{
                    name
                    _id
                }
            }
        }
    }
`;