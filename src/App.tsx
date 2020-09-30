import React, { useState } from 'react';
import Content from './componentes/Content'
import SideFilters from './componentes/SideFilters'
import {CHARACTERS_QUERY, EPISODES_QUERY, LOCATIONS_QUERY} from './utils/queries'

function App() {

  const [dataAttrib, setDataAttrib] = useState("characters")
  const [filterQuery, setFilterQuery] = useState(CHARACTERS_QUERY)
  const [ filterContent, setFilterContent ] = useState('')
  const [seletedTypeName, setSeletedTypeName] =  useState<"name"|"type">("name")
  
  function handleFilter(event:any) {
    setFilterContent(event.target.value)
   
  }
  function handlerReset() {
    setFilterContent('')
  }

  function handlerFilterSelection(e:any) {
    if (e.target.value === "locations"){
      setFilterQuery(LOCATIONS_QUERY)
    }  
    else if(e.target.value === "episodes"){
      setFilterQuery(EPISODES_QUERY)
    }
    else{
      setFilterQuery(CHARACTERS_QUERY)
    }
    setDataAttrib(e.target.value)
  }

  function handlerSeletedTypeName(e:any) {
    setSeletedTypeName(e.target.value)
  }
  
  return (
 <div className="wrapper">
   <div className="mt-3">
    <div className="row">
      <div className="col-3"/>
      <div className="col-8">
      <select onChange={handlerSeletedTypeName} value={seletedTypeName}>
            <option value="name">Name</option>
            <option  value="type">Type</option>
          </select>
        <div className="form-group d-flex" style={{position:"relative"}}>
          <input type="text" className="form-control" style={{paddingLeft: 35, borderRadius: 30}} value={filterContent} onChange={handleFilter}/>
          <button onClick={handlerReset}>Reset</button>         
          <svg style={{position: "absolute", left:"10px", top: "10px" }} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
          </svg>
        </div>
      </div>
      <div className="col-3" style={{borderRight: "3px solid black"}}>
        <SideFilters handler={handlerFilterSelection} value={dataAttrib}/>
      </div>
      <div className="col-9">
        <Content filter={filterContent} query={filterQuery} dataAttribute={dataAttrib} onSeletedTypeName={seletedTypeName}/>
      </div>
    </div>
   </div>
  </div>
  )  
}

export default App;
