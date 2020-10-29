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

interface Props {
  filter: string,
  query: DocumentNode,
  dataAttribute: string,
  onSeletedTypeName: "name" | "type"
}

const Characters = ({ filter, query, dataAttribute, onSeletedTypeName }: Props) => {

  const [page, setPage] = useState<number>(1)
  const [show, setShow] = useState<boolean>(false);
  const [selectedEntity, setSelectedEntity] = useState<object>({})

  const queryOptions = {
    variables: {
      name: "",
      type: "",
      page
    }
  }

  useEffect(() => { setPage(1) }, [filter]);

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

  const handleShow = (entity: itemInterface) => {
    setSelectedEntity(entity)
    setShow(true)
  };
  const handleClose = () => setShow(false);

  const handleContentItem = (entity: itemInterface) => {
    if (entity.image) {
      return (
        <>
          <img src={entity.image} alt={`${entity.name} image`} className=" w-100" />
          <h4 className="modal-title">{entity.name}</h4>
        </>
      )
    } else if (entity.dimension) {
      return (
        <>
          <h4 className="modal-title">{entity.name}</h4>
          <p>Type: <h6 className="d-inline">{entity.type}</h6></p>
          <p>Dimension: <h6 className="d-inline">{entity.dimension}</h6></p>
        </>
      )
    }
    return (
      <>
        <h4 className="modal-title">{entity.name}</h4>
        <p>Episode Date: <h6 className="d-inline">{entity.air_date}</h6></p>
        <p>Episode: <h6 className="d-inline">{entity.episode}</h6></p>
      </>
    )
  }

  return (
    <div className="mb-5" >
      <Entity show={show} handleClose={handleClose} selectedEntity={selectedEntity} />
      <div className="row">
        {data[dataAttribute].results.map((entity: itemInterface) => (
          <div onClick={() => handleShow(entity)} className="col-12 col-md-6 col-lg-4 col-xl-3" key={entity.id} >
            <div className="contentItem hoverShadow">
              {handleContentItem(entity)}
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn-dark ml-1" disabled={prevPage === null} onClick={() => setPage(prevPage)}>Previous Page</button>
      <button className="btn btn-dark ml-1" disabled={nextPage === null} onClick={() => setPage(nextPage)}>Next Page</button>
    </div>
  )
}

export default Characters
