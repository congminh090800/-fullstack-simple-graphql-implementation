import React, {useState} from 'react';
import {useQuery} from '@apollo/client';
import {searchDocs,getRestaurantPage,getNeighborhoodPage} from '../graphql/queries';
import { Container, Row, Col,Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import Data from './TableComponent';
import Header from './HeaderComponent';
import Find from './FindComponent';
import Loading from './LoadingComponent';
import { Switch, Route, Redirect } from 'react-router-dom'

const initialPage={
  limit:10,
  page:1,
  keyword:"",
  type:"Restaurant",
}

const Home=()=>{
  const [pageInfo,setPageInfo]=useState(initialPage);
  const [dataType,setDataType]=useState("Restaurant");
  const [searching,setSearching]=useState(false);

  const restaurantPage = useQuery(getRestaurantPage,{
    variables:pageInfo,
  });
  const restaurants=restaurantPage.data;
  const restaurantLoading=restaurantPage.loading;

  const neighborhoodPage = useQuery(getNeighborhoodPage,{
    variables:pageInfo,
  });
  const neighborhoods= neighborhoodPage.data;
  const neighborhoodLoading= neighborhoodPage.loading;

  const docs=useQuery(searchDocs,{
    variables:pageInfo,
  });


  let data={};
  if (searching){
    data=docs.data;
  }
  else if (dataType==="Restaurant"){
    data=restaurants;
  }else if (dataType==="Neighborhood"){
    data=neighborhoods;
  };

  function fetchPage(page){
    setPageInfo({...pageInfo,page:page});
  }

  const handleSubmit=(values)=>{
    setDataType(values);
    setPageInfo({...pageInfo,page:1,type:values});
  }
  const handleSearch=(values)=>{
    if (values) setSearching(true); else{
      setSearching(false);
    }
    setPageInfo({...pageInfo,type:dataType,keyword:values,page:1});
  }
  if((dataType==="Restaurant" && restaurantLoading) || (dataType==="Neighborhood" && neighborhoodLoading) || docs.loading){
    return (
      <>
      <Header handleSubmit={handleSubmit} handleSearch={handleSearch} selected={dataType}/>
      <Loading/>
      </>
    );
  }else{
    if (data){
      let page=data;
      if (page.restaurants){
        page=page.restaurants;
      }else if(page.neighborhoods){
        page=page.neighborhoods;
      }else if (page.searchDocs){
        page=page.searchDocs;
      }
    return (
      <>
      <Header handleSubmit={handleSubmit} handleSearch={handleSearch} page={page.page} totalPages={page.totalPages} selected={dataType}/>
      <Container className="mt-5">
        <Row>
          <Col xs="12" sm={{size:"12",offset:"10"}} className="mt-3">
            <Pagination>
            {page.hasPrevPage &&
            <PaginationItem>
                <PaginationLink onClick={()=>fetchPage(pageInfo.page-1)}> 
                  Previous
                </PaginationLink>
              </PaginationItem>
            }
            {page.hasNextPage &&
            <PaginationItem >
                <PaginationLink onClick={()=>fetchPage(pageInfo.page+1)}> 
                  Next
                </PaginationLink>
              </PaginationItem>
            }
            </Pagination>
          </Col>
        </Row>
        {/* RENDER TABLE */}
        <Data pageData={data}/>
        {/* RENDER TABLE */}
        <Row>
          <Col xs="12" sm={{size:"12",offset:"10"}} className="mt-3">
            <Pagination>
            {page.hasPrevPage &&
            <PaginationItem>
                <PaginationLink onClick={()=>fetchPage(pageInfo.page-1)}> 
                  Previous
                </PaginationLink>
              </PaginationItem>
            }
            {page.hasNextPage &&
            <PaginationItem >
                <PaginationLink onClick={()=>fetchPage(pageInfo.page+1)}> 
                  Next
                </PaginationLink>
              </PaginationItem>
            }
            </Pagination>
          </Col>
        </Row>
      </Container>
      </>
      );
    }else{
      return <div></div>;
    }
  }
}

const Main=(props)=>{
    return(
      <Switch location={props.location}>
      <Route path='/home' component={()=><Home/>} />
      <Route exact path='/:neighborhoodId' component={({match})=><Find neighborhoodId={match.params.neighborhoodId} />} />
      <Redirect to="/home" />
      </Switch>
    );
}
export default Main;