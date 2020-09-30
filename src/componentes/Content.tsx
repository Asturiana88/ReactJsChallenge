import React, { useEffect, useState } from 'react'
import { useQuery, DocumentNode } from '@apollo/client';
import Entity from './Entity'

function Characters(props:{filter:string, query:DocumentNode, dataAttribute:string, onSeletedTypeName:"name"|"type"}) {

const {filter, query, dataAttribute, onSeletedTypeName} = props

const [page, setPage] = useState<number>(1)
const [show, setShow] = useState(false);
const [selectedElem, setSelectedElem] = useState({})


const queryOptions = { 
  variables:{
    name: "",
    type: "",
    page
  }
}

useEffect(() => {setPage(1)}, [filter]);


if (filter.length > 2 || filter.length === 0){
  queryOptions.variables[onSeletedTypeName] = filter
}

const { loading, error, data } = useQuery(query, queryOptions)

if(error) return <div> Error... </div>;
if(!data || !data[dataAttribute] || loading) return <div> Loading... </div>;
 
  let nextPage = data[dataAttribute].info.next
  let prevPage = data[dataAttribute].info.prev

  
/*   function seletedFilteredHandler(event:any) {
    setSelectedFilter(event.target.value)
  } */

  function prevPageHandler() {
    setPage(currentPage => currentPage -1)
  }

  function nextPageHandler() {
    setPage(currentPage => currentPage +1)
  }

  const handleShow = (elem:any) => {
    setSelectedElem(elem)
    setShow(true)
  };
  const handleClose = () => setShow(false);

  return (
    <div>
      <Entity show={show} handleClose={handleClose} selElem={selectedElem}/>
      <div className="row">
        {data[dataAttribute].results.map((elem:any) => {
        return (
            <div onClick={() => handleShow(elem)} className="col-3" key={elem.id}> 
              {elem.image && 
                  <img src={elem.image} alt={elem.name + "image"}/>
                }
              <h4 >{elem.name}</h4>
           </div>
        )
      })}
      </div>
     <button disabled={prevPage == null} onClick={prevPageHandler}>Previus Page</button> 
     <button disabled={nextPage == null} onClick={nextPageHandler}>Next Page</button> 
  </div>
  )
}

export default Characters
