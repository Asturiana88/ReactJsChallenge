import React, { useEffect, useState } from 'react'
import { useQuery, DocumentNode } from '@apollo/client';
import Entity from './Entity'
import pickleRick from '../assets/pickle_rick.jpg'

export interface itemInterface {
  id?: number,
  name?: string,
  type?: string,
  gender?: string,
  species?: string,
  image?: string,
  dimension?: string,
  residents?: [{
    name: string,
    image: string
  }],
  episode?: string,
  air_date?: string,
  characters?: [{
    name: string,
    image: string
  }]
}

function Characters(props: { filter: string, query: DocumentNode, dataAttribute: string, onSeletedTypeName: "name" | "type" }) {

  const { filter, query, dataAttribute, onSeletedTypeName } = props

  const [page, setPage] = useState<number>(1)
  const [show, setShow] = useState(false);
  const [selectedElem, setSelectedElem] = useState({})


  const queryOptions = {
    variables: {
      name: "",
      type: "",
      page
    }
  }

  useEffect(() => {
    setPage(1)
  }, [filter]);



  if (filter.length > 2 || filter.length === 0) {
    queryOptions.variables[onSeletedTypeName] = filter
  }

  const { loading, error, data } = useQuery(query, queryOptions)


  if (error && !data) return <div>
    <strong>We couldn't find results... but we have this Pickle Rick for you :D!!</strong>
    <img src={pickleRick} alt={"Pickle Rick"} className="w-auto notFound" />
  </div>;

  if (!data || !data[dataAttribute] || loading) return <div> Loading... </div>;

  let nextPage = data[dataAttribute].info.next
  let prevPage = data[dataAttribute].info.prev

  function prevPageHandler() {
    setPage(currentPage => currentPage - 1)
  }

  function nextPageHandler() {
    setPage(currentPage => currentPage + 1)
  }

  const handleShow = (elem: itemInterface) => {
    setSelectedElem(elem)
    setShow(true)
  };
  const handleClose = () => setShow(false);

  return (
    <div>
      <Entity show={show} handleClose={handleClose} selElem={selectedElem} />
      <div className="row">
        {data[dataAttribute].results.map((elem: itemInterface) => {
          return (
            <div onClick={() => handleShow(elem)} className="col-12 col-md-6 col-lg-4 col-xl-3" key={elem.id} >
              <div className="contentItem hoverShadow">
                {elem.image ?
                  <>
                    <img src={elem.image} alt={elem.name + "image"} className=" w-100" />
                    <h4 className="modal-title">{elem.name}</h4>
                  </>
                  : elem.dimension ?
                    <>
                      <h4 className="modal-title">{elem.name}</h4>
                      <p>Type: <h6 className="d-inline">{elem.type}</h6></p>
                      <p>Dimension: <h6 className="d-inline">{elem.dimension}</h6></p>
                    </>
                    :
                    <>
                      <h4 className="modal-title">{elem.name}</h4>
                      <p>Episode Date: <h6 className="d-inline">{elem.air_date}</h6></p>
                      <p>Episode: <h6 className="d-inline">{elem.episode}</h6></p>
                    </>
                }
              </div>
            </div>
          )
        })}
      </div>
      <button className="btn btn-dark ml-1" disabled={prevPage == null} onClick={prevPageHandler}>Previous Page</button>
      <button className="btn btn-dark ml-1" disabled={nextPage == null} onClick={nextPageHandler}>Next Page</button>
    </div>
  )
}

export default Characters
