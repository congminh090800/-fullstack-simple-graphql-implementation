import { useQuery } from '@apollo/client';
import React from 'react';
import {findRestaurantsByNeighborhood} from '../graphql/queries';
import Data from './TableComponent';
import {Container, Navbar,NavbarBrand} from 'reactstrap';
import Loading from './LoadingComponent';

const initialPage={
    page:1,
    limit:20,
    _id:null,
    pagination:false
}

const Find=(props)=>{
    const {data,loading}=useQuery(findRestaurantsByNeighborhood,{
        variables:{...initialPage,_id:props.neighborhoodId}
    });
    if (loading){
        return (
            <Loading/>
        );
    }
    else if (data && data.findRestaurantsByNeighborhood){
        return(
            <>
            <Navbar className="bottom-shadow" color="white" light expand="md" fixed="top">
                <Container>
                <NavbarBrand href="/">
                    Home
                </NavbarBrand>
               </Container>
            </Navbar>
            <Container className="mt-5">
                <Data pageData={data.findRestaurantsByNeighborhood}/>
            </Container>
            </>
        );
    }else{
        return (
            <Container className="mt-5 text-center">
                No restaurant found
            </Container>
        );
    }
}

export default Find;