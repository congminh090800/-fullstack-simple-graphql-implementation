import React from 'react';
import { Row, Col, Table } from 'reactstrap';

function RenderItem({item}){
    return(
        <>
          <td>{item.name}</td>
          {item.__typename==="Neighborhood"?<td><a href={`/${item._id}`}>See</a></td>:null}
          {item.__typename==="Restaurant"?(<><td>{item.borough}</td>
                                            <td>{item.address.zipcode}</td>
                                            <td>{item.address.street}</td>
                                            <td>{item.address.building}</td></>):null}
        </>
    );
}

const Data=(props)=>{
    function RenderTable({pageData}){
        console.log(pageData)
        let page=pageData;
        if (pageData.restaurants){
            page=page.restaurants;
        }else if(pageData.neighborhoods){
            page=page.neighborhoods;
        }else if(pageData.searchDocs){
            page=page.searchDocs;
        }
        const table=page.docs.map((item)=>{
            return(
                <tr key={item._id} >
                    <RenderItem item={item} />
                </tr>
            ); 
        });
        return(
            <>
                {(pageData.searchDocs && pageData.searchDocs.docs[0] && pageData.searchDocs.docs[0].__typename==="Restaurant") || (pageData.docs && pageData.docs[0] && pageData.docs[0].__typename==="Restaurant") || pageData.restaurants?<h3>RESTAURANTS</h3>:null}
                {(pageData.searchDocs && pageData.searchDocs.docs[0] && pageData.searchDocs.docs[0].__typename==="Neighborhood") || pageData.neighborhoods?<h3>NEIGHBORHOODS</h3>:null}
                <Table>
                <thead>
                    <tr>
                    <th>NAME</th>
                    {(pageData.searchDocs && pageData.searchDocs.docs[0] && pageData.searchDocs.docs[0].__typename==="Neighborhood") ||pageData.neighborhoods?<th>DISCOVER</th>:null}
                    {(pageData.searchDocs && pageData.searchDocs.docs[0]
                     && pageData.searchDocs.docs[0].__typename==="Restaurant")
                    || (pageData.docs && pageData.docs[0] && pageData.docs[0].__typename==="Restaurant")
                      || pageData.restaurants?(<><th>BOROUGH</th>
                                                <th>ZIPCODE</th>
                                                <th>STREET</th>
                                                <th>BUILDING</th></>):null}
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
                </Table>
            </>
        );  
    }
    return(
        <Row>
            <Col xs="12" sm={{size:"12"}} className="mt-3">
                <RenderTable pageData={props.pageData}/>
            </Col>
        </Row>
    );
}

export default Data;