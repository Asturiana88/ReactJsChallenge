import React, { useState } from 'react';
import Content from './componentes/Content';
import SideFilters from './componentes/SideFilters';
import Footer from './componentes/Footer';
import "./App.css";
import {CHARACTERS_QUERY, EPISODES_QUERY, LOCATIONS_QUERY} from './utils/queries';

const MagnifierSvg = () => (
  <svg viewBox="0 0 16px 16px" className="magnifierSvg" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
    <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
   </svg>
)

function App() {

  const [dataAttrib, setDataAttrib] = useState("characters")
  const [filterQuery, setFilterQuery] = useState(CHARACTERS_QUERY)
  const [filterContent, setFilterContent ] = useState('')
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
    setSeletedTypeName("name")
  }

  function handlerSeletedTypeName(e:any) {
    setSeletedTypeName(e.target.value)
  }
  
  return (
 <div className="wrapper">
   <div className="container-fluid mt-3">
    <div className="row">
      <div className="col col-md-2"/>
      <div className="col-12 col-md-9">
        <div className="form-group d-flex position-relative">
          <select disabled={dataAttrib === "episodes"} className="form-control w-auto selectType" onChange={handlerSeletedTypeName} value={seletedTypeName}>
            <option value="name">Name</option>
         <option value="type">Type</option>
          </select>
          <div className="position-relative w-100 ml-1">
            <input type="text" className="form-control inputSearch" value={filterContent} onChange={handleFilter}/>
            <MagnifierSvg />
          </div>
          <button className="btn btn-dark ml-1" onClick={handlerReset}>Reset</button>         
        </div>
      </div>
      <div className="col-12 col-md-3 col-lg-2 sideFilterContainer" >
        <SideFilters handler={handlerFilterSelection} value={dataAttrib}/>
      </div>
      <div className="col-12 col-md-9">
        <Content filter={filterContent} query={filterQuery} dataAttribute={dataAttrib} onSeletedTypeName={seletedTypeName}/>
      </div>
    </div>
   </div>
    <Footer/>
  </div>
  )  
}

export default App;
