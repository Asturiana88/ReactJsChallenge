import React from 'react'
import {Modal} from 'react-bootstrap'

interface EntityProps {
  show:Boolean,
  handleClose:(elem:any)=>void,
  selElem:any
}

export default function Entity(props:EntityProps) {
  const {show, handleClose, selElem} = props
    return (
      <Modal show={show} onHide={handleClose}>
      {
        selElem.name ? 
        <>
        <div className="d-flex justify-content-end">
            <button onClick={handleClose} className="close closeBtn">X</button>
        </div>
        {selElem.image ?
       <Modal.Body>
          <img width="100%" src={selElem.image} alt={selElem.name}/>
          <Modal.Title className="titleModal">
            {selElem.name}
          </Modal.Title>
          <table>
            <tbody>
            <tr>
              <td>Type:</td>
              <td><strong>{selElem.type === "" ?  " - "  : selElem.type}</strong></td>
            </tr>
            <tr>
              <td>Gender:</td>
              <td><strong>{selElem.gender}</strong></td>
            </tr>
            <tr>
              <td>Species:</td>
              <td><strong>{selElem.species}</strong></td>
            </tr>
            </tbody>
          </table>
        </Modal.Body>
        : selElem.dimension ? 
        <Modal.Body>
            <Modal.Title className="titleModal">
              {selElem.name}
            </Modal.Title>
            <p><strong><u>Type:</u></strong>{" " + selElem.type}</p>
            <p><strong><u>Dimension:</u></strong>{" " + selElem.dimension}</p>
            <p><u><strong>Residents: </strong></u></p>
            <div className="row">
                  {selElem.residents && selElem.residents.map((elem:any, i:number)=>{
                        if (i < 5){
                          if (elem.name == null){return <strong className="noData">No Residents</strong>}
                          return (
                            <div key={elem.id}  className="col-5 col-md-3 titleModal contentItem">
                            <img width="100%" src={elem.image} alt={elem.name}/> <br/>
                            <strong>{" " + elem.name}</strong>
                            </div>
                          )
                        }
                        return null
                    } 
                  ) 
                  }
            </div>
         </Modal.Body>
         :  <Modal.Body>
              <Modal.Title className="titleModal">
              {selElem.name}
            </Modal.Title>
                <p><strong><u>Release Date:</u></strong>{" " + selElem.air_date}</p>
                <p><strong><u>Episode:</u></strong>{" " + selElem.episode}</p>
                <p><u><strong>Characters: </strong></u></p>   
                <div className="row">
                   {selElem.characters && selElem.characters.map((elem:any, i:number)=>{
                    if (i < 5){
                      return (
                        <div  key={elem.id} className="col-5 col-md-3 titleModal contentItem">
                        <img width="100%" src={elem.image} alt={elem.name}/> <br/>
                        <strong>{" " + elem.name}</strong>
                        </div>
                      )
                    }
                    return null
                }
                )
              }
             </div>                 
               
       </Modal.Body>       
        }
        </>
          : "Loading"  }
      </Modal>
    )
}
